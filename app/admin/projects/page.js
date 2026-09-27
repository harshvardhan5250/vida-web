"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const projectsQuery = query(
        collection(db, "projects"),
        orderBy("createdAt", "desc")
      );

      const unsubscribeProjects = onSnapshot(
        projectsQuery,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setProjects(data);
          setLoading(false);
        },
        (error) => {
          console.error("Projects error:", error);
          setLoading(false);
        }
      );

      return unsubscribeProjects;
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="adminPage">

      <div className="adminHeader">

        <p className="sectionLabel">
          ADMIN PANEL
        </p>

        <h1>Projects</h1>

        <p>
          Manage all website projects from
          one place.
        </p>

      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (

        <div className="adminEmpty">

          <h2>No projects yet</h2>

          <p>
            New customer projects will
            appear here.
          </p>

        </div>

      ) : (

        <div className="adminTableWrapper">

          <table className="adminTable">

            <thead>

              <tr>
                <th>Project</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Package</th>
                <th>Status</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {projects.map((project) => (

                <tr key={project.id}>

                  <td>
                    {project.projectName ||
                      "Untitled Project"}
                  </td>

                  <td>
                    {project.customerName ||
                      project.name ||
                      "Unknown"}
                  </td>

                  <td>
                    {project.email || "-"}
                  </td>

                  <td>
                    {project.package || "-"}
                  </td>

                  <td>
                    <span className="statusBadge">
                      {project.status || "Pending"}
                    </span>
                  </td>

                  <td>
                    {project.createdAt?.toDate
                      ? project.createdAt
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