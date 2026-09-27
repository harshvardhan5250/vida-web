"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="authPage">
      <div className="authBox">

        <div className="authHeader">
          <h1>Reset Password</h1>

          <p>
            Enter your email and we'll send you a
            password reset link.
          </p>
        </div>

        <form className="authForm">

          <div className="inputGroup">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="authButton"
          >
            Send Reset Link →
          </button>

        </form>

        <div className="authFooter">
          <p>
            Remember your password?{" "}
            <Link href="/login">
              Back to Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}