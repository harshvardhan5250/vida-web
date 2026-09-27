"use client";

import Link from "next/link";

const projects = [
  {
    number: "01",
    title: "Urban Cafe",
    category: "Restaurant Website",
    description:
      "A modern restaurant website with menu presentation, location information and online enquiry flow.",
    tags: ["Business", "Responsive", "Modern UI"],
  },
  {
    number: "02",
    title: "Nova Fitness",
    category: "Fitness Website",
    description:
      "A bold fitness website designed to showcase services, programs, trainers and membership information.",
    tags: ["Fitness", "Landing Page", "UI Design"],
  },
  {
    number: "03",
    title: "Apex Studio",
    category: "Creative Portfolio",
    description:
      "A minimal portfolio experience for a creative studio with strong visual hierarchy and project presentation.",
    tags: ["Portfolio", "Creative", "Minimal"],
  },
  {
    number: "04",
    title: "TechFlow",
    category: "Startup Website",
    description:
      "A professional startup website focused on presenting the product, features and business value clearly.",
    tags: ["Startup", "SaaS", "Responsive"],
  },
  {
    number: "05",
    title: "Luxe Estate",
    category: "Real Estate Website",
    description:
      "A premium real estate interface for showcasing properties, services and customer enquiries.",
    tags: ["Real Estate", "Premium", "Business"],
  },
  {
    number: "06",
    title: "Creator Hub",
    category: "Personal Brand",
    description:
      "A personal brand website designed for creators to showcase their work, services and online presence.",
    tags: ["Creator", "Personal Brand", "Modern"],
  },
];

export default function PortfolioPage() {
  return (
    <div className="portfolioPage">

      {/* HERO */}

      <section className="portfolioHero">

        <p className="sectionLabel">
          OUR WORK
        </p>

        <h1>
          Websites that
          <br />
          <span>make an impression.</span>
        </h1>

        <p className="portfolioHeroText">
          Explore some of the digital experiences
          created by VIDA WEB for businesses,
          startups, creators and brands.
        </p>

      </section>


      {/* PROJECTS */}

      <section className="portfolioSection">

        <div className="portfolioSectionHeader">

          <div>
            <p className="sectionLabel">
              SELECTED PROJECTS
            </p>

            <h2>
              Built with purpose.
            </h2>
          </div>

          <p>
            Every website is designed around the
            client&apos;s brand, audience and goals.
          </p>

        </div>


        <div className="portfolioGrid">

          {projects.map((project) => (
            <article
              className="portfolioCard"
              key={project.number}
            >

              {/* PROJECT VISUAL */}

              <div className="portfolioVisual">

                <span className="portfolioNumber">
                  {project.number}
                </span>

                <div className="portfolioMockup">

                  <div className="mockupTop">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="mockupContent">

                    <div className="mockupLine large"></div>

                    <div className="mockupLine"></div>

                    <div className="mockupLine short"></div>

                    <div className="mockupBlocks">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                  </div>

                </div>

              </div>


              {/* PROJECT INFO */}

              <div className="portfolioCardContent">

                <span className="portfolioCategory">
                  {project.category}
                </span>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>


                <div className="portfolioTags">

                  {project.tags.map((tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))}

                </div>

              </div>

            </article>
          ))}

        </div>

      </section>


      {/* PROCESS */}

      <section className="portfolioProcess">

        <div className="portfolioProcessHeader">

          <p className="sectionLabel">
            OUR APPROACH
          </p>

          <h2>
            From idea to
            <br />
            <span>digital experience.</span>
          </h2>

        </div>


        <div className="processGrid">

          <div className="processItem">
            <span>01</span>

            <h3>
              Discover
            </h3>

            <p>
              We understand your business,
              audience and project requirements.
            </p>
          </div>


          <div className="processItem">
            <span>02</span>

            <h3>
              Design
            </h3>

            <p>
              We create a clean and modern
              interface around your brand.
            </p>
          </div>


          <div className="processItem">
            <span>03</span>

            <h3>
              Develop
            </h3>

            <p>
              Your design is transformed into
              a fast and responsive website.
            </p>
          </div>


          <div className="processItem">
            <span>04</span>

            <h3>
              Launch
            </h3>

            <p>
              After testing and review, your
              website goes live.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="portfolioCTA">

        <p className="sectionLabel">
          HAVE A PROJECT?
        </p>

        <h2>
          Your website could
          <br />
          be next.
        </h2>

        <p>
          Tell us what you want to build and
          let&apos;s turn your idea into reality.
        </p>

        <Link
          href="/dashboard/new-project"
          className="dashboardButton"
        >
          Start a Project →
        </Link>

      </section>

    </div>
  );
}