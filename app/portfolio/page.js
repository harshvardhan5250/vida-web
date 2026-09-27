import Link from "next/link";

const projects = [
  {
    number: "01",
    title: "Business Website",
    category: "Business",
    description:
      "A modern professional website designed to help a local business build its online presence.",
  },
  {
    number: "02",
    title: "E-Commerce Store",
    category: "E-Commerce",
    description:
      "A clean online store interface with products, categories and a smooth shopping experience.",
  },
  {
    number: "03",
    title: "Personal Portfolio",
    category: "Portfolio",
    description:
      "A professional portfolio website for showcasing skills, projects and achievements.",
  },
  {
    number: "04",
    title: "Restaurant Website",
    category: "Business",
    description:
      "A modern restaurant website with menu, location, contact information and online presence.",
  },
  {
    number: "05",
    title: "Startup Landing Page",
    category: "Startup",
    description:
      "A conversion-focused landing page designed for a growing startup or new product.",
  },
  {
    number: "06",
    title: "Custom Web Application",
    category: "Web App",
    description:
      "A custom web application interface built around specific business requirements.",
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
          Projects we've
          <br />
          <span>built.</span>
        </h1>

        <p>
          A selection of websites and digital experiences
          designed and developed by VIDA WEB.
        </p>

      </section>


      {/* PROJECTS */}

      <section className="portfolioList">

        <div className="portfolioGrid">

          {projects.map((project) => (
            <div
              className="portfolioCard"
              key={project.number}
            >

              <div className="portfolioImage">

                <span className="projectNumber">
                  {project.number}
                </span>

                <span className="projectCategory">
                  {project.category}
                </span>

                <div className="projectMockup">
                  <span>VIDA WEB</span>
                </div>

              </div>


              <div className="portfolioContent">

                <h2>
                  {project.title}
                </h2>

                <p>
                  {project.description}
                </p>

                <Link href="/contact">
                  View Project →
                </Link>

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* CTA */}

      <section className="portfolioCTA">

        <p className="sectionLabel">
          HAVE A PROJECT?
        </p>

        <h2>
          Your project could
          <span> be next.</span>
        </h2>

        <p>
          Tell us what you want to build and
          let's create something great together.
        </p>

        <Link
          href="/signup"
          className="primaryButton"
        >
          Start Your Project →
        </Link>

      </section>

    </div>
  );
}