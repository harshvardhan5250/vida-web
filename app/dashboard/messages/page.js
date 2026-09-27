"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function DashboardMessagesPage() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

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
          orderBy("createdAt", "asc")
        );

        unsubscribeMessages = onSnapshot(
          messagesQuery,
          (snapshot) => {
            const data = snapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
              .filter(
                (item) =>
                  item.userId === currentUser.uid ||
                  item.customerId === currentUser.uid ||
                  item.email === currentUser.email
              );

            setMessages(data);
            setLoading(false);
          },
          (err) => {
            console.error(
              "Messages error:",
              err
            );

            setError(
              "Unable to load messages."
            );

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

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || !user) {
      return;
    }

    setError("");
    setSending(true);

    try {
      await addDoc(
        collection(db, "messages"),
        {
          userId: user.uid,
          customerId: user.uid,

          name:
            user.displayName || "Customer",

          email:
            user.email || "",

          message: message.trim(),

          sender: "customer",

          createdAt:
            serverTimestamp(),
        }
      );

      setMessage("");
    } catch (err) {
      console.error(
        "Send message error:",
        err
      );

      setError(
        "Unable to send message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "Sending...";
    }

    try {
      if (
        typeof date.toDate === "function"
      ) {
        return date
          .toDate()
          .toLocaleString("en-IN");
      }

      return new Date(date).toLocaleString(
        "en-IN"
      );
    } catch {
      return "N/A";
    }
  };

  if (!user) {
    return (
      <div className="authPage">
        <div className="customersMessage">
          Loading messages...
        </div>
      </div>
    );
  }

  return (
    <div className="adminCustomersPage">

      {/* HEADER */}

      <div className="customersHeader">

        <div>

          <p className="sectionLabel">
            CLIENT DASHBOARD
          </p>

          <h1>
            Messages
          </h1>

          <p className="customersSubtitle">
            Chat with the VIDA WEB team
            about your project.
          </p>

        </div>

        <Link
          href="/dashboard"
          className="backButton"
        >
          ← Dashboard
        </Link>

      </div>


      {/* MESSAGE AREA */}

      <div
        className="customersTableContainer"
        style={{
          maxWidth: "900px",
        }}
      >

        <div className="tableHeader">

          <h2>
            Project Conversation
          </h2>

          <span>
            {messages.length} messages
          </span>

        </div>


        {/* MESSAGES */}

        <div
          style={{
            padding: "25px",
            minHeight: "350px",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >

          {loading && (
            <div className="customersMessage">
              Loading conversation...
            </div>
          )}


          {!loading &&
            !error &&
            messages.length === 0 && (

              <div className="customersMessage">

                <p>
                  No messages yet.
                </p>

                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    color: "#555",
                  }}
                >
                  Send a message below to
                  start a conversation.
                </p>

              </div>

            )}


          {!loading &&
            messages.length > 0 && (

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >

                {messages.map((item) => {

                  const isCustomer =
                    item.sender ===
                      "customer" ||
                    item.userId === user.uid;

                  return (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent:
                          isCustomer
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >

                      <div
                        style={{
                          maxWidth: "70%",
                          padding:
                            "14px 16px",
                          background:
                            isCustomer
                              ? "#7c5cff"
                              : "#181818",
                          border:
                            "1px solid #292929",
                          borderRadius:
                            "12px",
                        }}
                      >

                        <p
                          style={{
                            color: "#fff",
                            fontSize: "14px",
                            lineHeight: "1.5",
                          }}
                        >
                          {item.message ||
                            item.description ||
                            "No message"}
                        </p>

                        <p
                          style={{
                            marginTop:
                              "7px",
                            color:
                              isCustomer
                                ? "#ddd"
                                : "#777",
                            fontSize: "11px",
                          }}
                        >
                          {formatDate(
                            item.createdAt
                          )}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>

            )}

        </div>


        {/* ERROR */}

        {error && (
          <div className="customersError">
            {error}
          </div>
        )}


        {/* SEND MESSAGE */}

        <form
          onSubmit={sendMessage}
          style={{
            padding: "20px",
            borderTop: "1px solid #222",
            display: "flex",
            gap: "12px",
          }}
        >

          <input
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            disabled={sending}
            required
            style={{
              flex: 1,
              height: "48px",
              padding: "0 14px",
              background: "#090909",
              color: "#fff",
              border: "1px solid #292929",
              borderRadius: "9px",
              outline: "none",
              fontSize: "14px",
            }}
          />

          <button
            type="submit"
            className="authButton"
            disabled={sending}
            style={{
              width: "130px",
              marginTop: 0,
            }}
          >
            {sending
              ? "Sending..."
              : "Send →"}
          </button>

        </form>

      </div>

    </div>
  );
}