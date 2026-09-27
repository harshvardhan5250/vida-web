"use client";

import Link from "next/link";

export default function PricingCard({
  name,
  price,
  description,
  features = [],
  popular = false,
}) {
  return (
    <div
      className={`pricingCard ${
        popular ? "pricingFeatured" : ""
      }`}
    >

      {/* POPULAR BADGE */}

      {popular && (
        <div className="popularBadge">
          MOST POPULAR
        </div>
      )}


      {/* HEADER */}

      <div className="pricingCardHeader">

        <p className="pricingPlanName">
          {name}
        </p>

        <h2>
          {price}
        </h2>

        <p>
          {description}
        </p>

      </div>


      {/* FEATURES */}

      <div className="pricingFeatures">

        {features.map((feature, index) => (
          <div
            className="pricingFeature"
            key={`${feature}-${index}`}
          >
            <span>✓</span>

            <p>
              {feature}
            </p>
          </div>
        ))}

      </div>


      {/* BUTTON */}

      <Link
        href="/dashboard/new-project"
        className="pricingButton"
      >
        Get Started →
      </Link>

    </div>
  );
}