"use client";

import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);

      if (err.code === "auth/invalid-credential") {
        setError(
          "Incorrect email or password."
        );
      } else if (err.code === "auth/invalid-email") {
        setError(
          "Please enter a valid email address."
        );
      } else if (err.code === "auth/user-disabled") {
        setError(
          "This account has been disabled."
        );
      } else {
        setError(
          "Unable to login. Please try again."
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
            Welcome Back
          </h1>

          <p>
            Login to manage your projects,
            payments and account.
          </p>

        </div>


        {/* LOGIN FORM */}

        <form
          className="authForm"
          onSubmit={handleLogin}
        >

          {/* EMAIL */}

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


          {/* PASSWORD */}

          <div className="formGroup">

            <div className="passwordLabelRow">

              <label htmlFor="password">
                Password
              </label>

              <Link
                href="/forgot-password"
                className="forgotPassword"
              >
                Forgot Password?
              </Link>

            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
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


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="authButton"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login →"}
          </button>

        </form>


        {/* SIGNUP */}

        <div className="authFooter">

          <p>
            Don&apos;t have an account?
          </p>

          <Link href="/signup">
            Create an account →
          </Link>

        </div>

      </div>

    </div>
  );
}