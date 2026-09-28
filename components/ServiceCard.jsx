
"use client";

export default function ServiceCard({
  title,
  description,
  price,
  children,
}) {
  return (
    <div className="serviceCard">
      <div className="serviceCardHeader">
        <span className="sectionLabel">
          VIDA WEB
        </span>

        <h3>{title}</h3>
      </div>

      <p>{description}</p>

      <div className="serviceCardBottom">
        <strong>{price}</strong>

        {children || (
          <a href="/contact">
            Get Started →
          </a>
        )}
      </div>
    </div>
  );
}