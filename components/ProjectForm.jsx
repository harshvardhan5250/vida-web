"use client";

import { useState } from "react";

export default function ProjectForm({ onSubmit }) {
  const [projectName, setProjectName] = useState("");
  const [packageName, setPackageName] = useState("₹15,000");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectName.trim()) return;

    const projectData = {
      projectName: projectName.trim(),
      package: packageName,
      description: description.trim(),
      status: "Pending",
      paymentStatus: "Pending",
      progress: 0,
    };

    if (onSubmit) {
      onSubmit(projectData);
    }

    setProjectName("");
    setPackageName("₹15,000");
    setDescription("");
  };

  return (
    <form className="projectForm" onSubmit={handleSubmit}>
      <div className="formGroup">
        <label>Project Name</label>

        <input
          type="text"
          placeholder="e.g. Business Website"
          value={projectName}
          onChange={(e) =>
            setProjectName(e.target.value)
          }
          required
        />
      </div>

      <div className="formGroup">
        <label>Select Package</label>

        <select
          value={packageName}
          onChange={(e) =>
            setPackageName(e.target.value)
          }
        >
          <option value="₹15,000">₹15,000 Package</option>
          <option value="₹20,000">₹20,000 Package</option>
          <option value="₹30,000">₹30,000 Package</option>
          <option value="Custom">Custom Package</option>
        </select>
      </div>

      <div className="formGroup">
        <label>Project Description</label>

        <textarea
          placeholder="Tell us about your website..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows="5"
        />
      </div>

      <button type="submit" className="authButton">
        Create Project →
      </button>
    </form>
  );
}