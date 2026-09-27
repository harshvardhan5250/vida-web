"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function DashboardProjectsPage() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
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

        setUser(currentUser);

        try {
          const projectsRef = collection(
            db,
            "projects"
          );

          const projectsQuery = query(
            projectsRef,
            where(
              "customerId",
              "==",
              currentUser.uid
            ),
            orderBy("createdAt", "desc")
          );

          const snapshot =
            await getDocs(projectsQuery);

          const data = snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

          if (mounted) {
            setProjects(data);
          }
        } catch (err) {
          console.error(
            "Projects error:",
            err
          );

          if (mounted) {
            setError(
              "Unable to load your projects."
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
    if (!date) return "N/A";

    try {
      if (
        typeof date.toDate === "function"
      ) {
        return date
          .toDate()
          .toLocaleDateString("en-IN");
      }

      return new Date(
        date
      ).toLocaleDateString("en-IN");
    } catch {
      return "N/A";
    }
  };

  const getStatusClass = (status) => {
    if (status === "completed") {
      return "#6ee7b7";
    }

    if (status === "in-progress") {
      return "#facc15";
    }

    return "#aaa";
  };

  if (!user) {
    return (
      <div className="authPage">
        <div className="customersMessage">
          Loading projects...
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
            My Projects
          </h1>

          <p className="customersSubtitle">
            Track your website projects,
            packages and development status.
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
            TOTAL PROJECTS
          </span>

          <strong>
            {projects.length}
          </strong>

        </div>


        <div className="customerStatCard">

          <span>
            IN PROGRESS
          </span>

          <strong>
            {
              projects.filter(
                (project) =>
                  project.status ===
                  "in-progress"
              ).length
            }
          </strong>

        </div>


        <div className="customerStatCard">

          <span>
            COMPLETED
          </span>

          <strong>
            {
              projects.filter(
                (project) =>
                  project.status ===
                  "completed"
              ).length
            }
          </strong>

        </div>

      </div>


      {/* PROJECTS */}

      <div className="customersTableContainer">

        <div className="tableHeader">

          <h2>
            My Website Projects
          </h2>

          <span>
            {projects.length} projects
          </span>

        </div>


        {loading && (
          <div className="customersMessage">
            Loading projects...
          </div>
        )}


        {!loading && error && (
          <div className="customersError">
            {error}
          </div>
        )}


        {!loading &&
          !error &&
          projects.length === 0 && (

            <div className="customersMessage">

              <p>
                You don't have any projects yet.
              </p>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  color: "#555",
                }}
              >
                Start your first website project
                with VIDA WEB.
              </p>

              <Link
                href="/dashboard/new-project"
                className="primaryButton"
                style={{
                  marginTop: "25px",
                }}
              >
                Start New Project →
              </Link>

            </div>

          )}


        {!loading &&
          !error &&
          projects.length > 0 && (

            <div className="tableWrapper">

              <table className="customersTable">

                <thead>

                  <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Package</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>

                </thead>

                <tbody>

                  {projects.map(
                    (project, index) => (

                      <tr key={project.id}>

                        <td>
                          {index + 1}
                        </td>

                        <td>
                          <strong>
                            {project.projectName ||
                              "Website Project"}
                          </strong>
                        </td>

                        <td>
                          {project.package ||
                            project.plan ||
                            "Custom"}
                        </td>

                        <td>

                          <span
                            style={{
                              color:
                                getStatusClass(
                                  project.status
                                ),
                              fontWeight:
                                "600",
                            }}
                          >
                            {project.status ||
                              "Pending"}
                          </span>

                        </td>

                        <td>
                          {formatDate(
                            project.createdAt
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