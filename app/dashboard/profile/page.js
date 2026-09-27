"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (!currentUser) {
          window.location.href = "/login";
          return;
        }

        setUser(currentUser);

        try {
          const userRef = doc(
            db,
            "users",
            currentUser.uid
          );

          const snapshot = await getDoc(userRef);

          if (snapshot.exists()) {
            setProfile(snapshot.data());
          }
        } catch (error) {
          console.error(
            "Profile error:",
            error
          );
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="authPage">
        <div className="customersMessage">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const name =
    profile?.name ||
    user.displayName ||
    "Customer";

  return (
    <div className="dashboardPage">

      {/* HEADER */}

      <section className="dashboardHero">

        <p className="sectionLabel">
          CLIENT PROFILE
        </p>

        <h1>
          Your
          <br />
          <span>Profile.</span>
        </h1>

        <p>
          Manage your VIDA WEB account information.
        </p>

      </section>


      {/* PROFILE CARD */}

      <section
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "35px",
          background: "#0d0d0d",
          border: "1px solid #222",
          borderRadius: "16px",
        }}
      >

        {/* AVATAR */}

        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "#7c5cff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "30px",
          }}
        >
          {name
            .charAt(0)
            .toUpperCase()}
        </div>


        {/* NAME */}

        <div
          style={{
            padding: "18px 0",
            borderBottom: "1px solid #222",
          }}
        >

          <p
            style={{
              color: "#777",
              fontSize: "12px",
              marginBottom: "7px",
              textTransform: "uppercase",
            }}
          >
            Full Name
          </p>

          <p
            style={{
              color: "#fff",
              fontSize: "16px",
            }}
          >
            {name}
          </p>

        </div>


        {/* EMAIL */}

        <div
          style={{
            padding: "18px 0",
            borderBottom: "1px solid #222",
          }}
        >

          <p
            style={{
              color: "#777",
              fontSize: "12px",
              marginBottom: "7px",
              textTransform: "uppercase",
            }}
          >
            Email
          </p>

          <p
            style={{
              color: "#fff",
              fontSize: "16px",
              wordBreak: "break-word",
            }}
          >
            {user.email}
          </p>

        </div>


        {/* USER ID */}

        <div
          style={{
            padding: "18px 0",
          }}
        >

          <p
            style={{
              color: "#777",
              fontSize: "12px",
              marginBottom: "7px",
              textTransform: "uppercase",
            }}
          >
            User ID
          </p>

          <p
            style={{
              color: "#aaa",
              fontSize: "13px",
              fontFamily: "monospace",
              wordBreak: "break-all",
            }}
          >
            {user.uid}
          </p>

        </div>


        {/* BACK BUTTON */}

        <Link
          href="/dashboard"
          className="primaryButton"
          style={{
            marginTop: "20px",
          }}
        >
          ← Back to Dashboard
        </Link>

      </section>

    </div>
  );
}