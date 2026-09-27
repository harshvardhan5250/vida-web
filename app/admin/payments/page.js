"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const paymentsQuery = query(
        collection(db, "payments"),
        orderBy("createdAt", "desc")
      );

      const unsubscribePayments = onSnapshot(
        paymentsQuery,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPayments(data);
          setLoading(false);
        },
        (error) => {
          console.error("Payments error:", error);
          setLoading(false);
        }
      );

      return unsubscribePayments;
    });

    return () => unsubscribeAuth();
  }, []);

  const totalAmount = payments.reduce(
    (total, payment) =>
      total + Number(payment.amount || 0),
    0
  );

  return (
    <div className="adminPage">

      <div className="adminHeader">

        <p className="sectionLabel">
          ADMIN PANEL
        </p>

        <h1>Payments</h1>

        <p>
          Track all customer payments and
          transactions.
        </p>

      </div>

      <div className="adminStats">

        <div className="adminStatCard">
          <span>Total Payments</span>
          <strong>{payments.length}</strong>
        </div>

        <div className="adminStatCard">
          <span>Total Amount</span>
          <strong>₹{totalAmount.toLocaleString()}</strong>
        </div>

      </div>

      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (

        <div className="adminEmpty">

          <h2>No payments yet</h2>

          <p>
            Customer payments will appear here.
          </p>

        </div>

      ) : (

        <div className="adminTableWrapper">

          <table className="adminTable">

            <thead>

              <tr>
                <th>Customer</th>
                <th>Email</th>
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
                    {payment.name || "Unknown"}
                  </td>

                  <td>
                    {payment.email || "-"}
                  </td>

                  <td>
                    ₹{Number(
                      payment.amount || 0
                    ).toLocaleString()}
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