"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "payments")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPayments(data);
      } catch (err) {
        console.error("Payments error:", err);

        setError(
          "Unable to load payments. Please check your Firebase data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";

    try {
      if (typeof date.toDate === "function") {
        return date.toDate().toLocaleString("en-IN");
      }

      return new Date(date).toLocaleString("en-IN");
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="adminCustomersPage">

      {/* HEADER */}

      <div className="customersHeader">

        <div>
          <p className="sectionLabel">
            ADMIN PANEL
          </p>

          <h1>
            Payments
          </h1>

          <p className="customersSubtitle">
            View customer payments and
            transaction information.
          </p>
        </div>

        <Link
          href="/admin"
          className="backButton"
        >
          ← Admin Dashboard
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
            DATABASE
          </span>

          <strong>
            Firebase
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


      {/* PAYMENTS TABLE */}

      <div className="customersTableContainer">

        <div className="tableHeader">

          <h2>
            Payment Records
          </h2>

          <span>
            {payments.length} payments
          </span>

        </div>


        {loading && (
          <div className="customersMessage">
            Loading payments...
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
                Customer payment records
                will appear here.
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
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment ID</th>
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

                          <div className="customerName">

                            <div className="customerAvatar">

                              {(
                                payment.name ||
                                payment.fullName ||
                                "C"
                              )
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            <strong>
                              {payment.name ||
                                payment.fullName ||
                                "Customer"}
                            </strong>

                          </div>

                        </td>


                        <td>
                          {payment.email ||
                            "N/A"}
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
                                  : "#aaa",
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