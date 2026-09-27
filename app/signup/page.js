"use client";

import { useState } from "react";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../../lib/firebase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      // Create Firebase account
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const user = userCredential.user;

      // Save name in Firebase Authentication
      await updateProfile(user, {
        displayName: name.trim(),
      });

      // Save customer data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      // Go to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Signup error:", err);

      if (err.code === "auth/email-already-in-use") {
        setError(
          "An account already exists with this email."
        );
      } else if (err.code === "auth/invalid-email") {
        setError(
          "Please enter a valid email address."
        );
      } else if (err.code === "auth/weak-password") {
        setError(
          "Password is too weak. Use at least 6 characters."
        );
      } else {
        setError(
          "Unable to create account. Please try again."
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
            Create Account
          </h1>

          <p>
            Create your account and start
            building your website with VIDA WEB.
          </p>

        </div>


        {/* FORM */}

        <form
          className="authForm"
          onSubmit={handleSignup}
        >

          <div className="formGroup">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Harsh Vardhan"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>


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


          <div className="formGroup">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          <div className="formGroup">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

          </div>


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
              ? "Creating Account..."
              : "Create Account →"}
          </button>

        </form>


        {/* FOOTER */}

        <div className="authFooter">

          <p>
            Already have an account?
          </p>

          <Link href="/login">
            Login →
          </Link>

        </div>

      </div>

    </div>
  );
}