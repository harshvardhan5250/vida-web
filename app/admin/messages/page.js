"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesRef = collection(db, "messages");

        const messagesQuery = query(
          messagesRef,
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(messagesQuery);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(data);
      } catch (err) {
        console.error("Messages error:", err);

        setError(
          "Unable to load messages. Please check your Firebase data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    try {
      if (typeof date.toDate === "function") {
        return date.toDate().toLocaleString("en-IN");
      }

      return new Date(date).toLocaleString("en-IN");
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="adminCustomersPage">

      {/* =========================
          HEADER
      ========================== */}

      <div className="customersHeader">

        <div>

          <p className="sectionLabel">
            ADMIN PANEL
          </p>

          <h1>
            Messages
          </h1>

          <p className="customersSubtitle">
            View and manage messages received from
            your customers.
          </p>

        </div>

        <Link
          href="/dashboard"
          className="backButton"
        >
          ← Dashboard
        </Link>

      </div>


      {/* =========================
          STATS
      ========================== */}

      <div className="customerStats">

        <div className="customerStatCard">

          <span>
            TOTAL MESSAGES
          </span>

          <strong>
            {messages.length}
          </strong>

        </div>


        <div className="customerStatCard">

          <span>
            DATABASE
          </span>

          <strong>
            Firebase
          </strong>

        </div>


        <div className="customerStatCard">

          <span>
            STATUS
          </span>

          <strong>
            Active
          </strong>

        </div>

      </div>


      {/* =========================
          MESSAGES TABLE
      ========================== */}

      <div className="customersTableContainer">

        <div className="tableHeader">

          <h2>
            Customer Messages
          </h2>

          <span>
            {messages.length} messages
          </span>

        </div>


        {/* Loading */}

        {loading && (
          <div className="customersMessage">
            Loading messages...
          </div>
        )}


        {/* Error */}

        {!loading && error && (
          <div className="customersError">
            {error}
          </div>
        )}


        {/* Empty */}

        {!loading &&
          !error &&
          messages.length === 0 && (
            <div className="customersMessage">

              <p>
                No messages found.
              </p>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  color: "#555",
                }}
              >
                Customer messages will appear here
                when someone contacts you.
              </p>

            </div>
          )}


        {/* Messages */}

        {!loading &&
          !error &&
          messages.length > 0 && (

            <div className="tableWrapper">

              <table className="customersTable">

                <thead>

                  <tr>

                    <th>
                      #
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Subject
                    </th>

                    <th>
                      Message
                    </th>

                    <th>
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {messages.map((message, index) => (

                    <tr key={message.id}>

                      {/* Number */}

                      <td>
                        {index + 1}
                      </td>


                      {/* Customer */}

                      <td>

                        <div className="customerName">

                          <div className="customerAvatar">

                            {(message.name ||
                              message.fullName ||
                              "C")
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                          <strong>
                            {message.name ||
                              message.fullName ||
                              "Customer"}
                          </strong>

                        </div>

                      </td>


                      {/* Email */}

                      <td>
                        {message.email || "N/A"}
                      </td>


                      {/* Subject */}

                      <td>
                        {message.subject ||
                          "General Enquiry"}
                      </td>


                      {/* Message */}

                      <td
                        style={{
                          maxWidth: "300px",
                          lineHeight: "1.5",
                        }}
                      >
                        {message.message ||
                          message.description ||
                          "No message"}
                      </td>


                      {/* Date */}

                      <td>
                        {formatDate(
                          message.createdAt
                        )}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

      </div>

    </div>
  );
}