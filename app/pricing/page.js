"use client";

import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "₹15,000",
    description:
      "For individuals and small businesses that need a clean professional website.",
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Modern UI Design",
      "Contact Form",
      "Basic SEO Setup",
      "Mobile Friendly",
      "Deployment Support",
    ],
    popular: false,
  },

  {
    name: "Professional",
    price: "₹20,000",
    description:
      "For growing businesses that need a stronger online presence.",
    features: [
      "Up to 8 Pages",
      "Premium UI Design",
      "Responsive Design",
      "Contact & Enquiry Forms",
      "Basic SEO Setup",
      "Performance Optimization",
      "Social Media Integration",
      "Deployment Support",
    ],
    popular: true,
  },

  {
    name: "Premium",
    price: "₹30,000",
    description:
      "For brands that need a complete and more advanced website experience.",
    features: [
      "Up to 12 Pages",
      "Premium Custom UI",
      "Responsive Design",
      "Advanced Animations",
      "Forms & Integrations",
      "SEO Setup",
      "Performance Optimization",
      "Analytics Integration",
      "Deployment Support",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="pricingPage">

      {/* HERO */}

      <section className="pricingHero">

        <p className="sectionLabel">
          SIMPLE PRICING
        </p>

        <h1>
          Choose the right
          <br />
          <span>website for you.</span>
        </h1>

        <p className="pricingHeroText">
          Transparent packages designed for businesses,
          creators and startups. No complicated pricing.
        </p>

      </section>


      {/* PRICING CARDS */}

      <section className="pricingSection">

        <div className="pricingGrid">

          {plans.map((plan) => (
            <div
              className={`pricingCard ${
                plan.popular
                  ? "pricingFeatured"
                  : ""
              }`}
              key={plan.name}
            >

              {/* POPULAR */}

              {plan.popular && (
                <div className="popularBadge">
                  MOST POPULAR
                </div>
              )}


              {/* PLAN HEADER */}

              <div className="pricingCardHeader">

                <p className="pricingPlanName">
                  {plan.name}
                </p>

                <h2>
                  {plan.price}
                </h2>

                <p>
                  {plan.description}
                </p>

              </div>


              {/* FEATURES */}

              <div className="pricingFeatures">

                {plan.features.map((feature) => (
                  <div
                    className="pricingFeature"
                    key={feature}
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
          ))}

        </div>

      </section>


      {/* CUSTOM PLAN */}

      <section className="customPricing">

        <div className="customPricingContent">

          <div>

            <p className="sectionLabel">
              NEED SOMETHING DIFFERENT?
            </p>

            <h2>
              Build a custom
              <br />
              solution.
            </h2>

            <p>
              Need e-commerce, dashboards, custom
              functionality or a larger website?
              Tell us what you need and we&apos;ll
              create a custom proposal.
            </p>

          </div>


          <Link
            href="/contact"
            className="dashboardButton"
          >
            Discuss Your Project →
          </Link>

        </div>

      </section>


      {/* FAQ */}

      <section className="pricingFAQ">

        <div className="pricingFAQHeader">

          <p className="sectionLabel">
            FAQ
          </p>

          <h2>
            Frequently asked questions.
          </h2>

        </div>


        <div className="faqGrid">

          <div className="faqItem">

            <h3>
              Is hosting included?
            </h3>

            <p>
              Hosting and domain costs can vary
              depending on your requirements. We can
              help you set everything up.
            </p>

          </div>


          <div className="faqItem">

            <h3>
              Can I request changes?
            </h3>

            <p>
              Yes. Project revisions can be discussed
              during the design and review stages.
            </p>

          </div>


          <div className="faqItem">

            <h3>
              Can you build an e-commerce website?
            </h3>

            <p>
              Yes. E-commerce and advanced
              functionality can be handled through
              a custom project.
            </p>

          </div>


          <div className="faqItem">

            <h3>
              How do I start?
            </h3>

            <p>
              Create an account, submit your project
              requirements and our team will contact you.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="pricingCTA">

        <p className="sectionLabel">
          READY TO START?
        </p>

        <h2>
          Let&apos;s build your
          <br />
          website.
        </h2>

        <p>
          Choose a package or tell us about your
          custom requirements.
        </p>

        <Link
          href="/dashboard/new-project"
          className="dashboardButton"
        >
          Start Your Project →
        </Link>

      </section>

    </div>
  );
}