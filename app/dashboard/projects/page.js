"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProjects = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          window.location.href = "/login";
          return;
        }

        const projectsQuery = query(
          collection(db, "projects"),
          where("customerId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        unsubscribeProjects = onSnapshot(
          projectsQuery,
          (snapshot) => {
            const projectData = snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

            setProjects(projectData);
            setLoading(false);
          },
          (error) => {
            console.error("Projects error:", error);
            setLoading(false);
          }
        );
      }
    );

    return () => {
      unsubscribeAuth();

      if (unsubscribeProjects) {
        unsubscribeProjects();
      }
    };
  }, []);

  return (
    <div className="dashboardPage">

      <div className="dashboardHeader">

        <div>
          <p className="sectionLabel">
            MY ACCOUNT
          </p>

          <h1>My Projects</h1>

          <p>
            Track all your VIDA WEB projects from one place.
          </p>
        </div>

        <Link
          href="/dashboard/new-projects"
          className="dashboardButton"
        >
          + New Project
        </Link>

      </div>


      {loading ? (
        <div className="dashboardEmpty">
          <p>Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="dashboardEmpty">

          <h2>No projects yet</h2>

          <p>
            You haven&apos;t started any project with VIDA WEB.
          </p>

          <Link
            href="/dashboard/new-projects"
            className="dashboardButton"
          >
            Start Your First Project →
          </Link>

        </div>
      ) : (

        <div className="projectGrid">

          {projects.map((project) => (

            <div
              className="projectCard"
              key={project.id}
            >

              <div className="projectCardTop">

                <div>
                  <span className="sectionLabel">
                    PROJECT
                  </span>

                  <h2>
                    {project.projectName ||
                      "Untitled Project"}
                  </h2>
                </div>

                <span className="statusBadge">
                  {project.status || "Pending"}
                </span>

              </div>


              <div className="projectInfo">

                <div>
                  <span>PACKAGE</span>

                  <strong>
                    {project.package || "-"}
                  </strong>
                </div>


                <div>
                  <span>PAYMENT</span>

                  <strong>
                    {project.paymentStatus ||
                      "Pending"}
                  </strong>
                </div>


                <div>
                  <span>PROGRESS</span>

                  <strong>
                    {Number(
                      project.progress || 0
                    )}
                    %
                  </strong>
                </div>

              </div>


              <div className="progressBar">

                <div
                  className="progressFill"
                  style={{
                    width: `${Math.min(
                      Number(project.progress || 0),
                      100
                    )}%`,
                  }}
                />

              </div>


              <p className="projectDescription">
                {project.description ||
                  "No project description available."}
              </p>


              <div className="projectFooter">

                <span>
                  {project.createdAt?.toDate
                    ? project.createdAt
                        .toDate()
                        .toLocaleDateString()
                    : "-"}
                </span>

                <span>
                  Project ID: {project.id}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}