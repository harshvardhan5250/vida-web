"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function MessagesPage() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeMessages = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (!currentUser) {
          window.location.href = "/login";
          return;
        }

        setUser(currentUser);

        const messagesQuery = query(
          collection(db, "messages"),
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );

        unsubscribeMessages = onSnapshot(
          messagesQuery,
          (snapshot) => {
            const messageData = snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

            setMessages(messageData);
            setLoading(false);
          },
          (error) => {
            console.error("Messages error:", error);
            setLoading(false);
          }
        );
      }
    );

    return () => {
      unsubscribeAuth();

      if (unsubscribeMessages) {
        unsubscribeMessages();
      }
    };
  }, []);

  return (
    <div className="dashboardPage">

      <div className="dashboardHeader">
        <p className="sectionLabel">MY ACCOUNT</p>

        <h1>Messages</h1>

        <p>
          View conversations and updates from the VIDA WEB team.
        </p>
      </div>

      {loading ? (
        <div className="dashboardEmpty">
          <p>Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="dashboardEmpty">
          <h2>No messages yet</h2>

          <p>
            Messages from the VIDA WEB team will appear here.
          </p>
        </div>
      ) : (
        <div className="messagesList">

          {messages.map((message) => (
            <div
              className="messageCard"
              key={message.id}
            >
              <div className="messageCardTop">
                <div>
                  <span className="sectionLabel">
                    {message.sender || "VIDA WEB"}
                  </span>

                  <h3>
                    {message.subject || "Message"}
                  </h3>
                </div>

                <span className="statusBadge">
                  {message.status || "New"}
                </span>
              </div>

              <p className="messageText">
                {message.message || "No message content."}
              </p>

              <span className="messageDate">
                {message.createdAt?.toDate
                  ? message.createdAt
                      .toDate()
                      .toLocaleString()
                  : "Recently"}
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}