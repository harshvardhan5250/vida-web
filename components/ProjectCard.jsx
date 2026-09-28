"use client";

export default function ProjectCard({ project }) {
  return (
    <div className="projectCard">
      <div className="projectCardTop">
        <div>
          <span className="projectLabel">PROJECT</span>
          <h3>{project?.projectName || "Website Project"}</h3>
        </div>

        <span className="projectStatus">
          {project?.status || "In Progress"}
        </span>
      </div>

      <p className="projectDescription">
        {project?.description ||
          "Your website project details will appear here."}
      </p>

      <div className="projectInfo">
        <div>
          <span>PACKAGE</span>
          <strong>{project?.package || "Custom"}</strong>
        </div>

        <div>
          <span>PROGRESS</span>
          <strong>{project?.progress || 0}%</strong>
        </div>

        <div>
          <span>PAYMENT</span>
          <strong>
            {project?.paymentStatus || "Pending"}
          </strong>
        </div>
      </div>

      <div className="progressBar">
        <div
          className="progressFill"
          style={{
            width: `${project?.progress || 0}%`,
          }}
        />
      </div>
    </div>
  );
}