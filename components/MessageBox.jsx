"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function MessageBox({
  user,
  projectId = "",
  projectName = "",
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!user) {
      setError("Please login before sending a message.");
      return;
    }

    if (!message.trim()) {
      setError("Please enter your message.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "messages"), {
        userId: user.uid,

        name: user.displayName || "",
        email: user.email || "",

        subject: subject.trim() || "General Inquiry",
        message: message.trim(),

        projectId: projectId || "",
        projectName: projectName || "",

        sender: "Customer",
        status: "Unread",

        createdAt: serverTimestamp(),
      });

      setSubject("");
      setMessage("");

      setSuccess(
        "Your message has been sent successfully."
      );
    } catch (err) {
      console.error("Message error:", err);

      setError(
        "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="messageBox">

      <div className="messageBoxHeader">

        <p className="sectionLabel">
          CONTACT SUPPORT
        </p>

        <h2>
          Send us a message
        </h2>

        <p>
          Have a question about your project?
          Send a message to the VIDA WEB team.
        </p>

      </div>


      <form
        className="messageForm"
        onSubmit={handleSubmit}
      >

        <div className="formGroup">

          <label htmlFor="messageSubject">
            Subject
          </label>

          <input
            id="messageSubject"
            type="text"
            placeholder="Project update"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
          />

        </div>


        <div className="formGroup">

          <label htmlFor="messageText">
            Message
          </label>

          <textarea
            id="messageText"
            rows="6"
            placeholder="Write your message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            required
          />

        </div>


        {success && (
          <div className="contactSuccess">
            {success}
          </div>
        )}


        {error && (
          <div className="contactError">
            {error}
          </div>
        )}


        <button
          type="submit"
          className="contactSubmit"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Send Message →"}
        </button>

      </form>

    </div>
  );
}