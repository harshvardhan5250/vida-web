"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribePayments = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          window.location.href = "/login";
          return;
        }

        const paymentsQuery = query(
          collection(db, "payments"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        unsubscribePayments = onSnapshot(
          paymentsQuery,
          (snapshot) => {
            const paymentData = snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

            setPayments(paymentData);
            setLoading(false);
          },
          (error) => {
            console.error("Payments error:", error);
            setLoading(false);
          }
        );
      }
    );

    return () => {
      unsubscribeAuth();

      if (unsubscribePayments) {
        unsubscribePayments();
      }
    };
  }, []);

  const totalPaid = payments
    .filter(
      (payment) =>
        String(payment.status || "").toLowerCase() ===
        "paid"
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

  return (
    <div className="dashboardPage">

      <div className="dashboardHeader">
        <p className="sectionLabel">MY ACCOUNT</p>

        <h1>Payments</h1>

        <p>
          View your project payments and transaction history.
        </p>
      </div>

      <div className="dashboardStats">

        <div className="dashboardStatCard">
          <span>Total Transactions</span>
          <strong>{payments.length}</strong>
        </div>

        <div className="dashboardStatCard">
          <span>Total Paid</span>
          <strong>
            ₹{totalPaid.toLocaleString("en-IN")}
          </strong>
        </div>

      </div>

      {loading ? (
        <div className="dashboardEmpty">
          <p>Loading payments...</p>
        </div>
      ) : payments.length === 0 ? (
        <div className="dashboardEmpty">
          <h2>No payments yet</h2>

          <p>
            Your project payments will appear here.
          </p>
        </div>
      ) : (
        <div className="dashboardTableWrapper">

          <table className="dashboardTable">

            <thead>
              <tr>
                <th>Project</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment ID</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {payments.map((payment) => (
                <tr key={payment.id}>

                  <td>
                    {payment.projectName ||
                      "Website Project"}
                  </td>

                  <td>
                    ₹
                    {Number(
                      payment.amount || 0
                    ).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span className="statusBadge">
                      {payment.status || "Pending"}
                    </span>
                  </td>

                  <td>
                    {payment.paymentId ||
                      payment.id}
                  </td>

                  <td>
                    {payment.createdAt?.toDate
                      ? payment.createdAt
                          .toDate()
                          .toLocaleString()
                      : "-"}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}