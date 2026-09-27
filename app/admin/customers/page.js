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

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const customersQuery = query(
        collection(db, "users"),
        orderBy("createdAt", "desc")
      );

      const unsubscribeCustomers = onSnapshot(
        customersQuery,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setCustomers(data);
          setLoading(false);
        },
        (error) => {
          console.error("Customers error:", error);
          setLoading(false);
        }
      );

      return unsubscribeCustomers;
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="adminPage">

      <div className="adminHeader">
        <p className="sectionLabel">ADMIN PANEL</p>

        <h1>Customers</h1>

        <p>
          Manage all VIDA WEB customers from one place.
        </p>
      </div>

      {loading ? (
        <p>Loading customers...</p>
      ) : customers.length === 0 ? (
        <div className="adminEmpty">
          <h2>No customers yet</h2>

          <p>
            Registered customers will appear here.
          </p>
        </div>
      ) : (
        <div className="adminTableWrapper">

          <table className="adminTable">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Customer ID</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>

              {customers.map((customer) => (

                <tr key={customer.id}>

                  <td>
                    {customer.name || "Unknown"}
                  </td>

                  <td>
                    {customer.email || "-"}
                  </td>

                  <td>
                    <span className="tableId">
                      {customer.uid || customer.id}
                    </span>
                  </td>

                  <td>
                    {customer.createdAt?.toDate
                      ? customer.createdAt
                          .toDate()
                          .toLocaleDateString()
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