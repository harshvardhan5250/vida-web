"use client";

import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Business Websites",
    description:
      "Professional websites designed to establish your business online and turn visitors into customers.",
    features: [
      "Modern UI",
      "Mobile Responsive",
      "Contact Forms",
      "SEO Friendly",
    ],
  },

  {
    number: "02",
    title: "Landing Pages",
    description:
      "High-converting landing pages for products, campaigns, services and marketing initiatives.",
    features: [
      "Conversion Focused",
      "Fast Loading",
      "Responsive Design",
      "CTA Integration",
    ],
  },

  {
    number: "03",
    title: "E-Commerce",
    description:
      "Online stores that help businesses showcase products and manage their digital sales presence.",
    features: [
      "Product Pages",
      "Shopping Flow",
      "Payment Integration",
      "Order Management",
    ],
  },

  {
    number: "04",
    title: "Portfolio Websites",
    description:
      "Personal and professional portfolios that showcase your work, skills and achievements.",
    features: [
      "Project Showcase",
      "Personal Branding",
      "Responsive Design",
      "Contact Section",
    ],
  },

  {
    number: "05",
    title: "Custom Web Apps",
    description:
      "Custom web applications built around your specific business requirements and workflow.",
    features: [
      "Custom Features",
      "Database Integration",
      "Authentication",
      "Dashboard",
    ],
  },

  {
    number: "06",
    title: "Website Redesign",
    description:
      "Transform an outdated website into a modern, responsive and easier-to-use digital experience.",
    features: [
      "Modern UI",
      "UX Improvements",
      "Performance",
      "Mobile Optimization",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="servicesPage">

      {/* HERO */}

      <section className="servicesHero">

        <p className="sectionLabel">
          WHAT WE DO
        </p>

        <h1>
          Digital solutions
          <br />
          <span>built for your goals.</span>
        </h1>

        <p className="servicesHeroText">
          From simple business websites to custom web
          applications, VIDA WEB helps businesses,
          creators and startups build their digital presence.
        </p>

      </section>


      {/* SERVICES */}

      <section className="servicesSection">

        <div className="servicesSectionHeader">

          <div>

            <p className="sectionLabel">
              OUR SERVICES
            </p>

            <h2>
              Everything you need
              <br />
              to get online.
            </h2>

          </div>

          <p>
            We combine design, development and
            technology to create websites that are
            functional, responsive and easy to use.
          </p>

        </div>


        <div className="servicesGrid">

          {services.map((service) => (

            <article
              className="serviceCard"
              key={service.number}
            >

              <div className="serviceCardTop">

                <span className="serviceNumber">
                  {service.number}
                </span>

                <span className="serviceArrow">
                  ↗
                </span>

              </div>


              <h3>
                {service.title}
              </h3>


              <p className="serviceDescription">
                {service.description}
              </p>


              <div className="serviceFeatures">

                {service.features.map(
                  (feature) => (
                    <span key={feature}>
                      {feature}
                    </span>
                  )
                )}

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* WHY VIDA WEB */}

      <section className="whyServices">

        <div className="whyServicesHeader">

          <p className="sectionLabel">
            WHY VIDA WEB
          </p>

          <h2>
            More than just
            <br />
            <span>a website.</span>
          </h2>

        </div>


        <div className="whyServicesGrid">

          <div className="whyServiceItem">

            <span>01</span>

            <h3>
              Modern Design
            </h3>

            <p>
              Clean interfaces designed around
              your brand and audience.
            </p>

          </div>


          <div className="whyServiceItem">

            <span>02</span>

            <h3>
              Responsive
            </h3>

            <p>
              Your website works smoothly across
              phones, tablets and desktops.
            </p>

          </div>


          <div className="whyServiceItem">

            <span>03</span>

            <h3>
              Performance
            </h3>

            <p>
              We focus on clean implementation
              and a fast user experience.
            </p>

          </div>


          <div className="whyServiceItem">

            <span>04</span>

            <h3>
              Client Focused
            </h3>

            <p>
              Your requirements guide the design
              and development process.
            </p>

          </div>

        </div>

      </section>


      {/* PROCESS */}

      <section className="servicesProcess">

        <div className="servicesProcessHeader">

          <p className="sectionLabel">
            HOW IT WORKS
          </p>

          <h2>
            From idea to
            <br />
            <span>launch.</span>
          </h2>

        </div>


        <div className="servicesProcessGrid">

          <div className="servicesProcessItem">

            <span>01</span>

            <h3>
              Tell Us
            </h3>

            <p>
              Share your business idea,
              requirements and goals.
            </p>

          </div>


          <div className="servicesProcessItem">

            <span>02</span>

            <h3>
              We Design
            </h3>

            <p>
              We create a visual direction
              for your website.
            </p>

          </div>


          <div className="servicesProcessItem">

            <span>03</span>

            <h3>
              We Build
            </h3>

            <p>
              Your website is developed,
              tested and optimized.
            </p>

          </div>


          <div className="servicesProcessItem">

            <span>04</span>

            <h3>
              You Launch
            </h3>

            <p>
              After review and approval,
              your website goes live.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="servicesCTA">

        <p className="sectionLabel">
          HAVE A PROJECT?
        </p>

        <h2>
          Let&apos;s build
          <br />
          something valuable.
        </h2>

        <p>
          Tell us what you&apos;re looking to build
          and we&apos;ll help you find the right solution.
        </p>

        <div className="servicesCTAButtons">

          <Link
            href="/dashboard/new-project"
            className="dashboardButton"
          >
            Start a Project →
          </Link>

          <Link
            href="/pricing"
            className="secondaryButton"
          >
            View Pricing
          </Link>

        </div>

      </section>

    </div>
  );
}