import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "₹15,000",
    description: "For individuals and small businesses starting online.",
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Contact Form",
      "Basic SEO",
      "Mobile Friendly",
      "7 Days Support",
    ],
  },
  {
    name: "Business",
    price: "₹20,000",
    description: "For businesses that need a complete professional website.",
    popular: true,
    features: [
      "Up to 10 Pages",
      "Responsive Design",
      "Contact Form",
      "Basic SEO",
      "WhatsApp Integration",
      "Google Maps",
      "30 Days Support",
    ],
  },
  {
    name: "Custom",
    price: "₹30,000+",
    description: "For advanced websites and custom web applications.",
    features: [
      "Custom UI/UX",
      "Advanced Features",
      "Database Integration",
      "User Authentication",
      "Admin Dashboard",
      "Payment Integration",
      "Custom Support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="pricingPage">

      {/* HEADER */}

      <section className="pricingHero">

        <p className="sectionLabel">
          SIMPLE & TRANSPARENT
        </p>

        <h1>
          Choose the right
          <br />
          <span>package for you.</span>
        </h1>

        <p>
          Start with a package or tell us what you need.
          We'll build a solution around your requirements.
        </p>

      </section>


      {/* PRICING CARDS */}

      <section className="pricingCardsSection">

        <div className="pricingCards">

          {plans.map((plan) => (
            <div
              className={`pricingCard ${
                plan.popular ? "popularPlan" : ""
              }`}
              key={plan.name}
            >

              {plan.popular && (
                <div className="popularBadge">
                  MOST POPULAR
                </div>
              )}

              <div className="pricingCardHeader">
                <p>{plan.name}</p>

                <h2>{plan.price}</h2>

                <span>
                  {plan.description}
                </span>
              </div>

              <div className="pricingFeatures">

                {plan.features.map((feature) => (
                  <div
                    className="feature"
                    key={feature}
                  >
                    <span>✓</span>
                    {feature}
                  </div>
                ))}

              </div>

              <Link
                href="/signup"
                className="pricingButton"
              >
                Start Project →
              </Link>

            </div>
          ))}

        </div>

      </section>


      {/* CUSTOM CTA */}

      <section className="pricingCTA">

        <p className="sectionLabel">
          NOT SURE WHAT YOU NEED?
        </p>

        <h2>
          Let's discuss your
          <span> project.</span>
        </h2>

        <p>
          Tell us your idea, requirements and budget.
          We'll suggest the right solution for you.
        </p>

        <Link
          href="/contact"
          className="primaryButton"
        >
          Talk to Us →
        </Link>

      </section>

    </div>
  );
}