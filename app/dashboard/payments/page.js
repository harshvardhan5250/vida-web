"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function DashboardPaymentsPage() {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (!currentUser) {
          window.location.href = "/login";
          return;
        }

        if (!mounted) return;

        setUser(currentUser);

        try {
          const paymentsRef =
            collection(db, "payments");

          const paymentsQuery = query(
            paymentsRef,
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
          );

          const snapshot =
            await getDocs(paymentsQuery);

          const data = snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

          if (mounted) {
            setPayments(data);
          }
        } catch (err) {
          console.error(
            "Payments error:",
            err
          );

          if (mounted) {
            setError(
              "Unable to load your payment records."
            );
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      }
    );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    try {
      if (
        typeof date.toDate === "function"
      ) {
        return date
          .toDate()
          .toLocaleString("en-IN");
      }

      return new Date(date).toLocaleString(
        "en-IN"
      );
    } catch {
      return "N/A";
    }
  };

  if (!user) {
    return (
      <div className="authPage">
        <div className="customersMessage">
          Loading payments...
        </div>
      </div>
    );
  }

  return (
    <div className="adminCustomersPage">

      {/* HEADER */}

      <div className="customersHeader">

        <div>

          <p className="sectionLabel">
            CLIENT DASHBOARD
          </p>

          <h1>
            Payments
          </h1>

          <p className="customersSubtitle">
            View your website project
            payment history.
          </p>

        </div>

        <Link
          href="/dashboard"
          className="backButton"
        >
          ← Dashboard
        </Link>

      </div>


      {/* STATS */}

      <div className="customerStats">

        <div className="customerStatCard">

          <span>
            TOTAL PAYMENTS
          </span>

          <strong>
            {payments.length}
          </strong>

        </div>


        <div className="customerStatCard">

          <span>
            ACCOUNT
          </span>

          <strong
            style={{
              fontSize: "18px",
              wordBreak: "break-word",
            }}
          >
            {user.email}
          </strong>

        </div>


        <div className="customerStatCard">

          <span>
            STATUS
          </span>

          <strong>
            Active
          </strong>

        </div>

      </div>


      {/* PAYMENT TABLE */}

      <div className="customersTableContainer">

        <div className="tableHeader">

          <h2>
            Payment History
          </h2>

          <span>
            {payments.length} records
          </span>

        </div>


        {loading && (
          <div className="customersMessage">
            Loading payment history...
          </div>
        )}


        {!loading && error && (
          <div className="customersError">
            {error}
          </div>
        )}


        {!loading &&
          !error &&
          payments.length === 0 && (

            <div className="customersMessage">

              <p>
                No payments found.
              </p>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  color: "#555",
                }}
              >
                Your payment records will
                appear here after a payment
                is made.
              </p>

            </div>

          )}


        {!loading &&
          !error &&
          payments.length > 0 && (

            <div className="tableWrapper">

              <table className="customersTable">

                <thead>

                  <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                    <th>Date</th>
                  </tr>

                </thead>


                <tbody>

                  {payments.map(
                    (payment, index) => (

                      <tr key={payment.id}>

                        <td>
                          {index + 1}
                        </td>


                        <td>
                          <strong>
                            {payment.projectName ||
                              payment.project ||
                              "Website Project"}
                          </strong>
                        </td>


                        <td>

                          ₹
                          {payment.amount ??
                            payment.price ??
                            "0"}

                        </td>


                        <td>

                          <span
                            style={{
                              color:
                                payment.status ===
                                "success"
                                  ? "#6ee7b7"
                                  : payment.status ===
                                    "failed"
                                  ? "#ff7777"
                                  : "#facc15",
                              fontWeight: "600",
                            }}
                          >
                            {payment.status ||
                              "Pending"}
                          </span>

                        </td>


                        <td>

                          <span className="userId">

                            {payment.paymentId ||
                              payment.transactionId ||
                              payment.id}

                          </span>

                        </td>


                        <td>
                          {formatDate(
                            payment.createdAt
                          )}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

      </div>

    </div>
  );
}