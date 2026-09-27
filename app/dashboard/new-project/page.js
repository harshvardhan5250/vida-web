"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function NewProjectPage() {
  const [user, setUser] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          window.location.href = "/login";
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please login first.");
      return;
    }

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await addDoc(collection(db, "projects"), {
        projectName: projectName,
        package: packageName,
        description: description,

        customerId: user.uid,
        customerName:
          user.displayName || "",
        email: user.email || "",

        status: "Pending",

        createdAt: serverTimestamp(),
      });

      setProjectName("");
      setPackageName("");
      setDescription("");

      setSuccess(
        "Project request submitted successfully!"
      );
    } catch (err) {
      console.error("Project error:", err);

      setError(
        "Unable to submit project. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="authPage">
        <div className="customersMessage">
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="authPage">

      <div
        className="authBox"
        style={{
          maxWidth: "600px",
        }}
      >

        {/* HEADER */}

        <div className="authHeader">

          <p className="sectionLabel">
            VIDA WEB
          </p>

          <h1>
            Start Your Project
          </h1>

          <p>
            Tell us what you want to build.
            Our team will contact you.
          </p>

        </div>


        {/* FORM */}

        <form
          className="authForm"
          onSubmit={handleSubmit}
        >

          {/* PROJECT NAME */}

          <div className="inputGroup">

            <label>
              Project Name
            </label>

            <input
              type="text"
              placeholder="e.g. My Business Website"
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value)
              }
              required
            />

          </div>


          {/* PACKAGE */}

          <div className="inputGroup">

            <label>
              Select Package
            </label>

            <select
              value={packageName}
              onChange={(e) =>
                setPackageName(e.target.value)
              }
              required
              style={{
                width: "100%",
                height: "48px",
                padding: "0 14px",
                background: "#090909",
                color: "#fff",
                border: "1px solid #292929",
                borderRadius: "9px",
                outline: "none",
                fontSize: "14px",
              }}
            >

              <option value="">
                Select a package
              </option>

              <option value="Starter - ₹15,000">
                Starter - ₹15,000
              </option>

              <option value="Business - ₹20,000">
                Business - ₹20,000
              </option>

              <option value="Premium - ₹30,000">
                Premium - ₹30,000
              </option>

              <option value="Custom">
                Custom Project
              </option>

            </select>

          </div>


          {/* DESCRIPTION */}

          <div className="inputGroup">

            <label>
              Project Requirements
            </label>

            <textarea
              placeholder="Tell us about your website, features, design, pages, etc."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
              style={{
                width: "100%",
                minHeight: "150px",
                padding: "14px",
                background: "#090909",
                color: "#fff",
                border: "1px solid #292929",
                borderRadius: "9px",
                outline: "none",
                resize: "vertical",
                fontSize: "14px",
              }}
            />

          </div>


          {/* ERROR */}

          {error && (
            <p className="authError">
              {error}
            </p>
          )}


          {/* SUCCESS */}

          {success && (
            <p
              style={{
                color: "#6ee7b7",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              {success}
            </p>
          )}


          {/* SUBMIT */}

          <button
            type="submit"
            className="authButton"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "Submit Project →"}
          </button>

        </form>


        {/* BACK */}

        <div className="authFooter">

          <p>
            <Link href="/dashboard">
              ← Back to Dashboard
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}