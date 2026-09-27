"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "../../lib/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await sendPasswordResetEmail(
        auth,
        email.trim()
      );

      setSuccess(
        "Password reset link has been sent to your email. Please check your inbox."
      );

      setEmail("");
    } catch (err) {
      console.error(
        "Password reset error:",
        err
      );

      if (err.code === "auth/user-not-found") {
        setError(
          "No account was found with this email address."
        );
      } else if (err.code === "auth/invalid-email") {
        setError(
          "Please enter a valid email address."
        );
      } else if (err.code === "auth/too-many-requests") {
        setError(
          "Too many attempts. Please try again later."
        );
      } else {
        setError(
          "Unable to send reset email. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">

      <div className="authCard">

        {/* HEADER */}

        <div className="authHeader">

          <p className="sectionLabel">
            VIDA WEB
          </p>

          <h1>
            Forgot Password?
          </h1>

          <p>
            Enter your registered email address
            and we&apos;ll send you a password reset
            link.
          </p>

        </div>


        {/* FORM */}

        <form
          className="authForm"
          onSubmit={handleSubmit}
        >

          <div className="formGroup">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          {/* SUCCESS */}

          {success && (
            <div className="contactSuccess">
              {success}
            </div>
          )}


          {/* ERROR */}

          {error && (
            <div className="contactError">
              {error}
            </div>
          )}


          {/* BUTTON */}

          <button
            type="submit"
            className="authButton"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link →"}
          </button>

        </form>


        {/* BACK TO LOGIN */}

        <div className="authFooter">

          <Link href="/login">
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}