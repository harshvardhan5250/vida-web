"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../../lib/firebase";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProjects = null;
    let unsubscribePayments = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (!currentUser) {
          window.location.href = "/login";
          return;
        }

        setUser(currentUser);

        const projectsQuery = query(
          collection(db, "projects"),
          where(
            "customerId",
            "==",
            currentUser.uid
          )
        );

        unsubscribeProjects = onSnapshot(
          projectsQuery,
          (snapshot) => {
            const projectData =
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

            setProjects(projectData);
            setLoading(false);
          },
          (error) => {
            console.error(
              "Dashboard projects error:",
              error
            );

            setLoading(false);
          }
        );


        const paymentsQuery = query(
          collection(db, "payments"),
          where(
            "userId",
            "==",
            currentUser.uid
          )
        );

        unsubscribePayments = onSnapshot(
          paymentsQuery,
          (snapshot) => {
            const paymentData =
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

            setPayments(paymentData);
          },
          (error) => {
            console.error(
              "Dashboard payments error:",
              error
            );
          }
        );
      }
    );

    return () => {
      unsubscribeAuth();

      if (unsubscribeProjects) {
        unsubscribeProjects();
      }

      if (unsubscribePayments) {
        unsubscribePayments();
      }
    };
  }, []);


  const activeProjects = projects.filter(
    (project) =>
      project.status !== "Completed" &&
      project.status !== "Delivered"
  );


  const completedProjects = projects.filter(
    (project) =>
      project.status === "Completed" ||
      project.status === "Delivered"
  );


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


  if (loading) {
    return (
      <div className="dashboardPage">
        <div className="dashboardEmpty">
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="dashboardPage">

      {/* HEADER */}

      <div className="dashboardHeader">

        <div>

          <p className="sectionLabel">
            VIDA WEB
          </p>

          <h1>
            Welcome back
            {user?.displayName
              ? `, ${user.displayName}`
              : ""}
            .
          </h1>

          <p>
            Manage your websites, payments and
            conversations from one place.
          </p>

        </div>


        <Link
          href="/dashboard/new-projects"
          className="dashboardButton"
        >
          + New Project
        </Link>

      </div>


      {/* STATS */}

      <div className="dashboardStats">

        <div className="dashboardStatCard">
          <span>Total Projects</span>
          <strong>
            {projects.length}
          </strong>
        </div>


        <div className="dashboardStatCard">
          <span>Active Projects</span>
          <strong>
            {activeProjects.length}
          </strong>
        </div>


        <div className="dashboardStatCard">
          <span>Completed</span>
          <strong>
            {completedProjects.length}
          </strong>
        </div>


        <div className="dashboardStatCard">
          <span>Total Paid</span>
          <strong>
            ₹{totalPaid.toLocaleString("en-IN")}
          </strong>
        </div>

      </div>


      {/* QUICK ACTIONS */}

      <section className="dashboardSection">

        <div className="dashboardSectionHeader">

          <div>
            <p className="sectionLabel">
              QUICK ACCESS
            </p>

            <h2>
              Manage your account
            </h2>
          </div>

        </div>


        <div className="dashboardGrid">

          <Link
            href="/dashboard/projects"
            className="dashboardCard"
          >
            <span>01</span>

            <h3>
              My Projects
            </h3>

            <p>
              View your website projects,
              progress and current status.
            </p>

            <strong>
              View Projects →
            </strong>
          </Link>


          <Link
            href="/dashboard/new-projects"
            className="dashboardCard"
          >
            <span>02</span>

            <h3>
              New Project
            </h3>

            <p>
              Start a new website project with
              the VIDA WEB team.
            </p>

            <strong>
              Start Project →
            </strong>
          </Link>


          <Link
            href="/dashboard/payments"
            className="dashboardCard"
          >
            <span>03</span>

            <h3>
              Payments
            </h3>

            <p>
              Check your payment history and
              transaction details.
            </p>

            <strong>
              View Payments →
            </strong>
          </Link>


          <Link
            href="/dashboard/messages"
            className="dashboardCard"
          >
            <span>04</span>

            <h3>
              Messages
            </h3>

            <p>
              Communicate with the VIDA WEB
              team and receive updates.
            </p>

            <strong>
              View Messages →
            </strong>
          </Link>


          <Link
            href="/dashboard/profile"
            className="dashboardCard"
          >
            <span>05</span>

            <h3>
              My Profile
            </h3>

            <p>
              View and manage your account
              information.
            </p>

            <strong>
              View Profile →
            </strong>
          </Link>

        </div>

      </section>


      {/* RECENT PROJECTS */}

      <section className="dashboardSection">

        <div className="dashboardSectionHeader">

          <div>
            <p className="sectionLabel">
              RECENT ACTIVITY
            </p>

            <h2>
              Your Projects
            </h2>
          </div>

          <Link
            href="/dashboard/projects"
            className="dashboardTextLink"
          >
            View All →
          </Link>

        </div>


        {projects.length === 0 ? (

          <div className="dashboardEmpty">

            <h3>
              No projects yet
            </h3>

            <p>
              Start your first website project
              with VIDA WEB.
            </p>

            <Link
              href="/dashboard/new-projects"
              className="dashboardButton"
            >
              Create Project →
            </Link>

          </div>

        ) : (

          <div className="recentProjects">

            {projects
              .slice(0, 3)
              .map((project) => (

                <div
                  className="recentProjectCard"
                  key={project.id}
                >

                  <div>

                    <span className="sectionLabel">
                      PROJECT
                    </span>

                    <h3>
                      {project.projectName ||
                        "Untitled Project"}
                    </h3>

                    <p>
                      {project.package || "Custom"}
                    </p>

                  </div>


                  <div className="recentProjectRight">

                    <span className="statusBadge">
                      {project.status ||
                        "Pending"}
                    </span>

                    <strong>
                      {Number(
                        project.progress || 0
                      )}
                      %
                    </strong>

                  </div>

                </div>

              ))}

          </div>

        )}

      </section>

    </div>
  );
}