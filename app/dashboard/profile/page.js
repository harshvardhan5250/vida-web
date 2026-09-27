"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (!currentUser) {
          window.location.href = "/login";
          return;
        }

        setUser(currentUser);
        setEmail(currentUser.email || "");

        try {
          const userRef = doc(
            db,
            "users",
            currentUser.uid
          );

          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();

            setName(
              data.name ||
                currentUser.displayName ||
                ""
            );
          } else {
            setName(
              currentUser.displayName || ""
            );
          }
        } catch (err) {
          console.error(
            "Profile loading error:",
            err
          );

          setError(
            "Unable to load profile."
          );
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user) return;

    setSaving(true);
    setSuccess("");
    setError("");

    try {
      const cleanName = name.trim();

      if (!cleanName) {
        throw new Error(
          "Please enter your name."
        );
      }

      // Firebase Authentication profile
      await updateProfile(user, {
        displayName: cleanName,
      });

      // Firestore profile
      const userRef = doc(
        db,
        "users",
        user.uid
      );

      await updateDoc(userRef, {
        name: cleanName,
      });

      setSuccess(
        "Profile updated successfully."
      );

    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      setError(
        err.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboardPage">
        <div className="dashboardEmpty">
          <p>Loading profile...</p>
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
            MY ACCOUNT
          </p>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your VIDA WEB account information.
          </p>
        </div>

      </div>


      {/* PROFILE */}

      <div className="profileLayout">

        <div className="profileCard">

          <div className="profileAvatar">
            {name
              ? name
                  .charAt(0)
                  .toUpperCase()
              : "U"}
          </div>

          <h2>
            {name || "User"}
          </h2>

          <p>
            {email}
          </p>

          <span className="statusBadge">
            Customer
          </span>

        </div>


        {/* FORM */}

        <div className="profileFormWrapper">

          <form
            className="dashboardForm"
            onSubmit={handleSave}
          >

            <div className="formGroup">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your full name"
                required
              />

            </div>


            <div className="formGroup">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                disabled
              />

              <small>
                Your email address is managed by
                Firebase Authentication.
              </small>

            </div>


            <div className="formGroup">

              <label>
                Customer ID
              </label>

              <input
                type="text"
                value={user?.uid || ""}
                disabled
              />

            </div>


            {success && (
              <div className="contactSuccess">
                {success}
              </div>
            )}


            {error && (
              <div className="contactError">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="dashboardButton"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes →"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}