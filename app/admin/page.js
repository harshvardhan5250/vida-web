"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../lib/firebase";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        if (!currentUser) {
          window.location.href = "/login";
          return;
        }

        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="adminPage">
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="adminPage">

      <div className="adminHeader">

        <p className="sectionLabel">
          VIDA WEB
        </p>

        <h1>Admin Dashboard</h1>

        <p>
          Manage customers, projects,
          payments and messages.
        </p>

        {user && (
          <p className="adminEmail">
            Logged in as: {user.email}
          </p>
        )}

      </div>

      <div className="adminGrid">

        <Link
          href="/admin/customers"
          className="adminCard"
        >
          <span>01</span>

          <h2>Customers</h2>

          <p>
            View all registered customers
            and their account information.
          </p>

          <strong>
            View Customers →
          </strong>
        </Link>

        <Link
          href="/admin/projects"
          className="adminCard"
        >
          <span>02</span>

          <h2>Projects</h2>

          <p>
            Manage customer website
            projects and their status.
          </p>

          <strong>
            View Projects →
          </strong>
        </Link>

        <Link
          href="/admin/payments"
          className="adminCard"
        >
          <span>03</span>

          <h2>Payments</h2>

          <p>
            Track payments, amounts and
            transaction status.
          </p>

          <strong>
            View Payments →
          </strong>
        </Link>

        <Link
          href="/admin/messages"
          className="adminCard"
        >
          <span>04</span>

          <h2>Messages</h2>

          <p>
            Read messages sent by
            customers.
          </p>

          <strong>
            View Messages →
          </strong>
        </Link>

      </div>

    </div>
  );
}