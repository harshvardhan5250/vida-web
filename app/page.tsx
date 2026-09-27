import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Business Websites",
    text: "Professional websites designed to build trust and grow your online presence.",
  },
  {
    number: "02",
    title: "Landing Pages",
    text: "Focused landing pages designed around your product, service or campaign.",
  },
  {
    number: "03",
    title: "E-Commerce",
    text: "Modern online stores designed to showcase products and create a smooth shopping experience.",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    text: "We understand your business, audience and requirements.",
  },
  {
    number: "02",
    title: "Design",
    text: "We create a clean visual direction around your brand.",
  },
  {
    number: "03",
    title: "Develop",
    text: "We turn the design into a responsive and functional website.",
  },
  {
    number: "04",
    title: "Launch",
    text: "After testing and review, your website goes live.",
  },
];

export default function HomePage() {
  return (
    <div className="homePage">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="hero">

        <div className="heroContent">

          <p className="sectionLabel">
            DIGITAL STUDIO
          </p>

          <h1>
            Websites that
            <br />
            <span>mean business.</span>
          </h1>

          <p className="heroText">
            VIDA WEB creates modern, responsive and
            professional websites for businesses,
            startups and creators.
          </p>

          <div className="heroButtons">

            <Link
              href="/dashboard/new-project"
              className="dashboardButton"
            >
              Start a Project →
            </Link>

            <Link
              href="/portfolio"
              className="secondaryButton"
            >
              View Our Work
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO
          ===================================================== */}

      <section className="servicesSection">

        <div className="servicesSectionHeader">

          <div>

            <p className="sectionLabel">
              WHAT WE DO
            </p>

            <h2>
              We build digital
              <br />
              experiences.
            </h2>

          </div>

          <p>
            From simple business websites to custom
            digital experiences, we combine design and
            technology to help your business stand out.
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
                {service.text}
              </p>

              <Link
                href="/services"
                className="dashboardTextLink"
              >
                Explore Service →
              </Link>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          WHY VIDA WEB
          ===================================================== */}

      <section className="whyServices">

        <div className="whyServicesHeader">

          <p className="sectionLabel">
            WHY VIDA WEB
          </p>

          <h2>
            Designed to look good.
            <br />
            <span>Built to work.</span>
          </h2>

        </div>


        <div className="whyServicesGrid">

          <div className="whyServiceItem">

            <span>01</span>

            <h3>
              Modern Design
            </h3>

            <p>
              Clean interfaces with a strong visual
              identity built around your brand.
            </p>

          </div>


          <div className="whyServiceItem">

            <span>02</span>

            <h3>
              Responsive
            </h3>

            <p>
              Your website is designed to work across
              phones, tablets and desktops.
            </p>

          </div>


          <div className="whyServiceItem">

            <span>03</span>

            <h3>
              Performance
            </h3>

            <p>
              We focus on clean development and a
              smooth user experience.
            </p>

          </div>


          <div className="whyServiceItem">

            <span>04</span>

            <h3>
              Client Focused
            </h3>

            <p>
              Your business goals and requirements
              guide every project.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROCESS
          ===================================================== */}

      <section className="servicesProcess">

        <div className="servicesProcessHeader">

          <p className="sectionLabel">
            OUR PROCESS
          </p>

          <h2>
            From idea to
            <br />
            <span>launch.</span>
          </h2>

        </div>


        <div className="servicesProcessGrid">

          {process.map((item) => (

            <div
              className="servicesProcessItem"
              key={item.number}
            >

              <span>
                {item.number}
              </span>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          PRICING PREVIEW
          ===================================================== */}

      <section className="pricingSection">

        <div className="pricingHero">

          <p className="sectionLabel">
            SIMPLE PRICING
          </p>

          <h1>
            Start building
            <br />
            <span>without confusion.</span>
          </h1>

          <p className="pricingHeroText">
            Choose a package that fits your needs or
            contact us for a custom website.
          </p>

        </div>


        <div className="pricingGrid">

          <div className="pricingCard">

            <div className="pricingCardHeader">

              <p className="pricingPlanName">
                STARTER
              </p>

              <h2>
                ₹15,000
              </h2>

              <p>
                A professional website for individuals
                and small businesses.
              </p>

            </div>

            <Link
              href="/pricing"
              className="pricingButton"
            >
              View Package →
            </Link>

          </div>


          <div className="pricingCard pricingFeatured">

            <div className="popularBadge">
              MOST POPULAR
            </div>

            <div className="pricingCardHeader">

              <p className="pricingPlanName">
                PROFESSIONAL
              </p>

              <h2>
                ₹20,000
              </h2>

              <p>
                A stronger digital presence for growing
                businesses.
              </p>

            </div>

            <Link
              href="/pricing"
              className="pricingButton"
            >
              View Package →
            </Link>

          </div>


          <div className="pricingCard">

            <div className="pricingCardHeader">

              <p className="pricingPlanName">
                PREMIUM
              </p>

              <h2>
                ₹30,000
              </h2>

              <p>
                A complete premium website experience
                for established brands.
              </p>

            </div>

            <Link
              href="/pricing"
              className="pricingButton"
            >
              View Package →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="servicesCTA">

        <p className="sectionLabel">
          HAVE A PROJECT?
        </p>

        <h2>
          Your idea.
          <br />
          <span>Your website.</span>
        </h2>

        <p>
          Tell us what you want to build and let&apos;s
          turn your idea into a professional digital
          experience.
        </p>

        <div className="servicesCTAButtons">

          <Link
            href="/dashboard/new-project"
            className="dashboardButton"
          >
            Start a Project →
          </Link>

          <Link
            href="/contact"
            className="secondaryButton"
          >
            Contact Us
          </Link>

        </div>

      </section>

    </div>
  );
}