"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeMessages;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const messagesQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );

      unsubscribeMessages = onSnapshot(
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
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeMessages) {
        unsubscribeMessages();
      }
    };
  }, []);

  return (
    <div className="adminPage">
      <div className="adminHeader">
        <p className="sectionLabel">ADMIN PANEL</p>

        <h1>Customer Messages</h1>

        <p>
          View messages received from VIDA WEB customers.
        </p>
      </div>

      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="adminEmpty">
          <h2>No messages yet</h2>
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
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td>
                    {message.name || "Unknown"}
                  </td>

                  <td>
                    {message.email || "-"}
                  </td>

                  <td>
                    {message.message || "-"}
                  </td>

                  <td>
                    {message.createdAt?.toDate
                      ? message.createdAt
                          .toDate()
                          .toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}