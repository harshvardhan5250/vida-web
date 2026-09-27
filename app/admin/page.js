"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../lib/firebase";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="dashboardPage">
        <div className="customersMessage">
          Loading admin panel...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboardPage">

      {/* ADMIN HEADER */}

      <section className="dashboardHero">

        <p className="sectionLabel">
          VIDA WEB ADMIN
        </p>

        <h1>
          Admin
          <br />
          <span>Dashboard.</span>
        </h1>

        <p>
          Manage customers, projects, messages
          and payments from one place.
        </p>

      </section>


      {/* ADMIN OPTIONS */}

      <section className="dashboardGrid">

        {/* CUSTOMERS */}

        <Link
          href="/admin/customers"
          className="dashboardCard"
        >

          <span>01</span>

          <h2>
            Customers
          </h2>

          <p>
            View registered customers,
            their email and account details.
          </p>

        </Link>


        {/* MESSAGES */}

        <Link
          href="/admin/messages"
          className="dashboardCard"
        >

          <span>02</span>

          <h2>
            Messages
          </h2>

          <p>
            View enquiries and messages
            received from customers.
          </p>

        </Link>


        {/* PAYMENTS */}

        <Link
          href="/admin/payments"
          className="dashboardCard"
        >

          <span>03</span>

          <h2>
            Payments
          </h2>

          <p>
            View customer payments,
            transactions and payment status.
          </p>

        </Link>


        {/* PROJECTS */}

        <Link
          href="/admin/projects"
          className="dashboardCard"
        >

          <span>04</span>

          <h2>
            Projects
          </h2>

          <p>
            Manage website projects,
            development and delivery status.
          </p>

        </Link>

      </section>


      {/* ACCOUNT INFO */}

      <section
        style={{
          maxWidth: "1200px",
          margin: "40px auto 0",
          padding: "25px",
          background: "#0d0d0d",
          border: "1px solid #222",
          borderRadius: "14px",
        }}
      >

        <p
          style={{
            color: "#777",
            fontSize: "13px",
            marginBottom: "8px",
          }}
        >
          ADMIN ACCOUNT
        </p>

        <p
          style={{
            color: "#fff",
            fontSize: "14px",
          }}
        >
          {user.email}
        </p>

      </section>

    </div>
  );
}