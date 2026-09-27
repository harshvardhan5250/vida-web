"use client";

import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Login successful
      window.location.href = "/dashboard";

    } catch (error) {
      console.error(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Email or password is incorrect.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email.");
      } else {
        setError("Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">

      <div className="authBox">

        <div className="authHeader">
          <h1>Welcome Back</h1>

          <p>
            Login to manage your project with VIDA WEB.
          </p>
        </div>

        <form
          className="authForm"
          onSubmit={handleLogin}
        >

          <div className="inputGroup">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="inputGroup">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <div className="forgotPassword">
            <Link href="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p className="authError">
              {error}
            </p>
          )}

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

        <div className="authFooter">
          <p>
            Don't have an account?{" "}
            <Link href="/signup">
              Create Account
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}