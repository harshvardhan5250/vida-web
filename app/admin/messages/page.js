"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../../../lib/firebase";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const messagesQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );

      const unsubscribeMessages = onSnapshot(
        messagesQuery,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setMessages(data);
          setLoading(false);
        },
        (error) => {
          console.error("Messages error:", error);
          setLoading(false);
        }
      );

      return () => unsubscribeMessages();
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return (
      <main className="dashboardPage">
        <div className="dashboardContainer">
          <h1>Loading messages...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboardPage">
      <div className="dashboardContainer">

        <div className="dashboardHeader">
          <div>
            <p className="sectionLabel">ADMIN PANEL</p>

            <h1>Customer Messages</h1>

            <p>
              View messages received from VIDA WEB customers.
            </p>
          </div>
        </div>

        <div className="dashboardCard">

          {messages.length === 0 ? (
            <div className="emptyState">
              <h3>No messages yet</h3>
              <p>
                Customer messages will appear here.
              </p>
            </div>
          ) : (
            <div className="adminTableWrapper">

              <table className="adminTable">

                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Project</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {messages.map((message) => (
                    <tr key={message.id}>

                      <td>
                        {message.name || "N/A"}
                      </td>

                      <td>
                        {message.email || "N/A"}
                      </td>

                      <td>
                        {message.subject || "General Inquiry"}
                      </td>

                      <td>
                        {message.message || "N/A"}
                      </td>

                      <td>
                        {message.projectName || "General"}
                      </td>

                      <td>
                        {message.status || "Unread"}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}