"use client";

import { useState } from "react";
import Link from "next/link";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../../lib/firebase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setError("Please enter your full name.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      console.log("1. Starting Firebase signup...");

      // --------------------------------
      // 1. CREATE FIREBASE ACCOUNT
      // --------------------------------

      const authPromise = createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      const authTimeout = new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(
              new Error(
                "Firebase Authentication is taking too long. Please check the Firebase/Vercel connection."
              )
            ),
          15000
        )
      );

      const userCredential = await Promise.race([
        authPromise,
        authTimeout,
      ]);

      const user = userCredential.user;

      console.log("2. Firebase account created:", user.uid);

      // --------------------------------
      // 2. UPDATE USER NAME
      // --------------------------------

      await updateProfile(user, {
        displayName: cleanName,
      });

      console.log("3. Firebase profile updated.");

      // --------------------------------
      // 3. SAVE USER TO FIRESTORE
      // --------------------------------

      const firestorePromise = setDoc(
        doc(db, "users", user.uid),
        {
          name: cleanName,
          email: user.email,
          uid: user.uid,
          createdAt: serverTimestamp(),
        }
      );

      const firestoreTimeout = new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(
              new Error(
                "Firestore is taking too long to respond. Your Firebase Authentication may be working, but Firestore is not connecting."
              )
            ),
          15000
        )
      );

      await Promise.race([
        firestorePromise,
        firestoreTimeout,
      ]);

      console.log("4. User saved to Firestore.");

      // --------------------------------
      // 4. DASHBOARD
      // --------------------------------

      window.location.href = "/dashboard";

    } catch (err) {
      console.error("SIGNUP ERROR:", err);
      console.error("ERROR CODE:", err?.code);
      console.error("ERROR MESSAGE:", err?.message);

      if (err?.code === "auth/email-already-in-use") {
        setError(
          "An account already exists with this email."
        );
      }

      else if (err?.code === "auth/invalid-email") {
        setError(
          "Please enter a valid email address."
        );
      }

      else if (err?.code === "auth/weak-password") {
        setError(
          "Password is too weak. Use at least 6 characters."
        );
      }

      else if (err?.code === "auth/network-request-failed") {
        setError(
          "Firebase cannot connect to the server. Please check the Firebase/Vercel configuration."
        );
      }

      else if (
        err?.message?.includes("Authentication is taking too long")
      ) {
        setError(
          "Firebase Authentication is not responding. Please check your Firebase/Vercel configuration."
        );
      }

      else if (
        err?.message?.includes("Firestore is taking too long")
      ) {
        setError(
          "Firebase Authentication worked, but Firestore is not responding."
        );
      }

      else if (err?.code === "permission-denied") {
        setError(
          "Firestore permission denied. Please check Firestore Security Rules."
        );
      }

      else {
        setError(
          err?.message ||
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

          {error && (
            <div className="contactError">
              {error}
            </div>
          )}

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