"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "projects")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(data);
      } catch (err) {
        console.error("Projects error:", err);

        setError(
          "Unable to load projects. Please check your Firebase data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="adminCustomersPage">

      {/* HEADER */}

      <div className="customersHeader">

        <div>

          <p className="sectionLabel">
            ADMIN PANEL
          </p>

          <h1>
            Projects
          </h1>

          <p className="customersSubtitle">
            Manage customer website projects,
            development and delivery status.
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
            TOTAL PROJECTS
          </span>

          <strong>
            {projects.length}
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


      {/* PROJECT TABLE */}

      <div className="customersTableContainer">

        <div className="tableHeader">

          <h2>
            Project List
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
                No projects found.
              </p>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  color: "#555",
                }}
              >
                Customer website projects
                will appear here.
              </p>

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
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Package</th>
                    <th>Status</th>
                    <th>Date</th>
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
                              project.name ||
                              "Website Project"}
                          </strong>

                        </td>


                        <td>

                          <div className="customerName">

                            <div className="customerAvatar">

                              {(
                                project.customerName ||
                                project.fullName ||
                                project.name ||
                                "C"
                              )
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            <strong>
                              {project.customerName ||
                                project.fullName ||
                                "Customer"}
                            </strong>

                          </div>

                        </td>


                        <td>
                          {project.email ||
                            "N/A"}
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
                                project.status ===
                                "completed"
                                  ? "#6ee7b7"
                                  : project.status ===
                                    "in-progress"
                                  ? "#facc15"
                                  : "#aaa",
                              fontWeight: "600",
                            }}
                          >
                            {project.status ||
                              "Pending"}
                          </span>

                        </td>


                        <td>

                          {project.createdAt
                            ? project.createdAt
                                .toDate
                              ? project.createdAt
                                  .toDate()
                                  .toLocaleString(
                                    "en-IN"
                                  )
                              : new Date(
                                  project.createdAt
                                ).toLocaleString(
                                  "en-IN"
                                )
                            : "N/A"}

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