"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError("");

        const snapshot = await getDocs(
          collection(db, "users")
        );

        const customerList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCustomers(customerList);
      } catch (err) {
        console.error(err);
        setError("Unable to load customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="adminCustomersPage">

      {/* Header */}
      <div className="customersHeader">

        <div>
          <p className="sectionLabel">
            ADMIN PANEL
          </p>

          <h1>
            Customers
          </h1>

          <p className="customersSubtitle">
            Manage all registered VIDA WEB customers.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="backButton"
        >
          ← Dashboard
        </Link>

      </div>

      {/* Stats */}
      <div className="customerStats">

        <div className="customerStatCard">
          <span>Total Customers</span>
          <strong>{customers.length}</strong>
        </div>

        <div className="customerStatCard">
          <span>Registered Users</span>
          <strong>{customers.length}</strong>
        </div>

        <div className="customerStatCard">
          <span>Database</span>
          <strong>Firebase</strong>
        </div>

      </div>

      {/* Customer Table */}
      <div className="customersTableContainer">

        <div className="tableHeader">
          <h2>Customer List</h2>

          <span>
            {customers.length} Customers
          </span>
        </div>

        {loading && (
          <div className="customersMessage">
            Loading customers...
          </div>
        )}

        {error && (
          <div className="customersError">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          customers.length === 0 && (
            <div className="customersMessage">
              No customers registered yet.
            </div>
          )}

        {!loading &&
          !error &&
          customers.length > 0 && (

            <div className="tableWrapper">

              <table className="customersTable">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User ID</th>
                    <th>Created</th>
                  </tr>
                </thead>

                <tbody>

                  {customers.map((customer, index) => (

                    <tr key={customer.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <div className="customerName">
                          <div className="customerAvatar">
                            {customer.name
                              ? customer.name
                                  .charAt(0)
                                  .toUpperCase()
                              : "U"}
                          </div>

                          <strong>
                            {customer.name ||
                              "Unnamed User"}
                          </strong>
                        </div>
                      </td>

                      <td>
                        {customer.email ||
                          "No email"}
                      </td>

                      <td>
                        <span className="userId">
                          {customer.uid ||
                            customer.id}
                        </span>
                      </td>

                      <td>
                        {customer.createdAt
                          ? formatDate(
                              customer.createdAt
                            )
                          : "—"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

      </div>

    </div>
  );
}


/* =========================
   DATE FORMATTER
========================= */

function formatDate(timestamp) {
  try {

    if (
      timestamp &&
      typeof timestamp.toDate === "function"
    ) {
      return timestamp
        .toDate()
        .toLocaleDateString("en-IN");
    }

    return new Date(timestamp)
      .toLocaleDateString("en-IN");

  } catch {
    return "—";
  }
}