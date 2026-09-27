"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../../../lib/firebase";

export default function NewProjectPage() {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    projectName: "",
    package: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (!currentUser) {
          window.location.href = "/login";
          return;
        }

        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const projectData = {
        projectName: formData.projectName.trim(),

        package: formData.package,

        description:
          formData.description.trim(),

        customerId: user.uid,

        customerName:
          user.displayName || "",

        email: user.email || "",

        status: "Pending",

        paymentStatus: "Pending",

        progress: 0,

        createdAt: serverTimestamp(),

        updatedAt: serverTimestamp(),
      };

      await addDoc(
        collection(db, "projects"),
        projectData
      );

      setSuccess(
        "Project request submitted successfully!"
      );

      setFormData({
        projectName: "",
        package: "",
        description: "",
      });
    } catch (err) {
      console.error("Project creation error:", err);

      setError(
        "Unable to create project. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboardPage">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboardPage">

      <div className="dashboardHeader">
        <p className="sectionLabel">
          NEW PROJECT
        </p>

        <h1>Start a New Project</h1>

        <p>
          Tell us what you want to build and the VIDA WEB
          team will contact you.
        </p>
      </div>


      <div className="newProjectLayout">

        {/* PACKAGE */}

        <div className="projectPackages">

          <p className="sectionLabel">
            CHOOSE A PACKAGE
          </p>

          <div className="packageOption">

            <input
              type="radio"
              id="basic"
              name="package"
              value="₹15,000"
              checked={
                formData.package === "₹15,000"
              }
              onChange={handleChange}
            />

            <label htmlFor="basic">
              <strong>Starter</strong>

              <span>₹15,000</span>

              <small>
                Perfect for simple business websites.
              </small>
            </label>

          </div>


          <div className="packageOption">

            <input
              type="radio"
              id="professional"
              name="package"
              value="₹20,000"
              checked={
                formData.package === "₹20,000"
              }
              onChange={handleChange}
            />

            <label htmlFor="professional">
              <strong>Professional</strong>

              <span>₹20,000</span>

              <small>
                Advanced business website with more features.
              </small>
            </label>

          </div>


          <div className="packageOption">

            <input
              type="radio"
              id="premium"
              name="package"
              value="₹30,000"
              checked={
                formData.package === "₹30,000"
              }
              onChange={handleChange}
            />

            <label htmlFor="premium">
              <strong>Premium</strong>

              <span>₹30,000</span>

              <small>
                Complete premium website solution.
              </small>
            </label>

          </div>


          <div className="packageOption">

            <input
              type="radio"
              id="custom"
              name="package"
              value="Custom"
              checked={
                formData.package === "Custom"
              }
              onChange={handleChange}
            />

            <label htmlFor="custom">
              <strong>Custom</strong>

              <span>Let&apos;s Discuss</span>

              <small>
                For unique or larger projects.
              </small>
            </label>

          </div>

        </div>


        {/* FORM */}

        <div className="newProjectFormWrapper">

          <form
            className="dashboardForm"
            onSubmit={handleSubmit}
          >

            <div className="formGroup">

              <label htmlFor="projectName">
                Project Name
              </label>

              <input
                id="projectName"
                type="text"
                name="projectName"
                placeholder="e.g. My Business Website"
                value={formData.projectName}
                onChange={handleChange}
                required
              />

            </div>


            <div className="formGroup">

              <label htmlFor="description">
                Project Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="7"
                placeholder="Tell us about your website, required pages, features, design preferences, etc."
                value={formData.description}
                onChange={handleChange}
                required
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
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Project →"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}