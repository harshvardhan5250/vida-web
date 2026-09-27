import Link from "next/link";

export default function Home() {
  return (
    <>

      {/* HERO SECTION */}
      <section className="hero">

        <div className="heroContent">

          <p className="heroTag">
            PROFESSIONAL WEB DEVELOPMENT
          </p>

          <h1>
            Your Idea.
            <br />
            <span>Our Code.</span>
          </h1>

          <p className="heroDescription">
            We build modern, fast and professional websites
            for businesses, creators and startups.
          </p>

          <div className="heroButtons">

            <Link href="/signup" className="primaryButton">
              Start Your Project →
            </Link>

            <Link href="/portfolio" className="secondaryButton">
              View Our Work
            </Link>

          </div>

        </div>

      </section>


      {/* SERVICES SECTION */}
      <section className="servicesPreview">

        <div className="sectionHeading">

          <p>WHAT WE BUILD</p>

          <h2>
            Websites that
            <span> work for you.</span>
          </h2>

        </div>


        <div className="serviceGrid">

          <div className="serviceBox">
            <div className="serviceNumber">01</div>
            <h3>Business Websites</h3>
            <p>
              Professional websites designed to establish
              your business online.
            </p>
          </div>

          <div className="serviceBox">
            <div className="serviceNumber">02</div>
            <h3>E-Commerce</h3>
            <p>
              Online stores with products, payments and
              customer management.
            </p>
          </div>

          <div className="serviceBox">
            <div className="serviceNumber">03</div>
            <h3>Portfolio Websites</h3>
            <p>
              Showcase your work, skills and achievements
              with a professional website.
            </p>
          </div>

          <div className="serviceBox">
            <div className="serviceNumber">04</div>
            <h3>Custom Web Apps</h3>
            <p>
              Custom web applications built according to
              your business requirements.
            </p>
          </div>

        </div>

      </section>


      {/* PRICING SECTION */}
      <section className="pricingPreview">

        <p className="sectionLabel">
          SIMPLE PRICING
        </p>

        <h2>
          Websites starting from
          <span> ₹15,000</span>
        </h2>

        <p>
          Choose a package or tell us what you need.
          We will create a solution around your requirements.
        </p>

        <Link href="/pricing" className="primaryButton">
          View Pricing →
        </Link>

      </section>


      {/* CTA */}
      <section className="ctaSection">

        <h2>
          Have a project in mind?
        </h2>

        <p>
          Tell us what you want to build and let's make it happen.
        </p>

        <Link href="/signup" className="primaryButton">
          Start Your Project →
        </Link>

      </section>

    </>
  );
}