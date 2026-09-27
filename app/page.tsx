"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function HomePage() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = "/dashboard";
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="loginFirstPage">
      <div className="loginFirstCard">

        <p className="sectionLabel">
          VIDA WEB
        </p>

        <h1>
          Build your
          <br />
          <span>digital presence.</span>
        </h1>

        <p className="loginFirstText">
          Create your account or login to manage
          your websites, projects, payments and
          messages from one dashboard.
        </p>

        <div className="loginFirstButtons">

          <a
            href="/signup"
            className="dashboardButton"
          >
            Create Account →
          </a>

          <a
            href="/login"
            className="secondaryButton"
          >
            Login
          </a>

        </div>

        <div className="loginFirstFeatures">

          <div>
            <span>01</span>
            <p>Manage Projects</p>
          </div>

          <div>
            <span>02</span>
            <p>Track Payments</p>
          </div>

          <div>
            <span>03</span>
            <p>Contact VIDA WEB</p>
          </div>

        </div>

      </div>
    </main>
  );
}