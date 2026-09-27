"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboardPage">

      <section className="dashboardHero">

        <p className="sectionLabel">
          CLIENT DASHBOARD
        </p>

        <h1>
          Welcome back,
          <br />
          <span>{user.email}</span>
        </h1>

        <p>
          Manage your website project from here.
        </p>

      </section>

      <section className="dashboardGrid">

        <div className="dashboardCard">
          <span>01</span>
          <h2>My Projects</h2>
          <p>
            View and manage your website projects.
          </p>
        </div>

        <div className="dashboardCard">
          <span>02</span>
          <h2>New Project</h2>
          <p>
            Start a new website project with us.
          </p>
        </div>

        <div className="dashboardCard">
          <span>03</span>
          <h2>Payments</h2>
          <p>
            View your project payments and invoices.
          </p>
        </div>

        <div className="dashboardCard">
          <span>04</span>
          <h2>Messages</h2>
          <p>
            Communicate with the VIDA WEB team.
          </p>
        </div>

      </section>

    </div>
  );
}