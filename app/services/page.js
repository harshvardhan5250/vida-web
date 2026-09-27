import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Business Websites",
    description:
      "Professional websites for businesses that want a strong online presence and more customers.",
    price: "Starting ₹15,000",
  },
  {
    number: "02",
    title: "E-Commerce Websites",
    description:
      "Online stores with products, categories, customer accounts and payment integration.",
    price: "Starting ₹25,000",
  },
  {
    number: "03",
    title: "Portfolio Websites",
    description:
      "Modern portfolio websites for creators, students, freelancers and professionals.",
    price: "Starting ₹15,000",
  },
  {
    number: "04",
    title: "Custom Web Applications",
    description:
      "Custom web applications designed around your specific business requirements.",
    price: "Starting ₹30,000",
  },
];

export default function ServicesPage() {
  return (
    <div className="servicesPage">

      {/* HEADER */}

      <section className="servicesHero">

        <p className="sectionLabel">
          OUR SERVICES
        </p>

        <h1>
          We build websites
          <br />
          <span>that work.</span>
        </h1>

        <p className="servicesIntro">
          From simple business websites to complete web
          applications, we build digital products according
          to your requirements.
        </p>

      </section>


      {/* SERVICES */}

      <section className="servicesList">

        <div className="servicesGrid">

          {services.map((service) => (
            <div
              className="serviceCard"
              key={service.number}
            >

              <div className="serviceTop">
                <span>{service.number}</span>
                <span>↗</span>
              </div>

              <h2>{service.title}</h2>

              <p>
                {service.description}
              </p>

              <div className="serviceBottom">

                <strong>
                  {service.price}
                </strong>

                <Link href="/signup">
                  Start Project →
                </Link>

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* CTA */}

      <section className="servicesCTA">

        <p className="sectionLabel">
          HAVE SOMETHING ELSE IN MIND?
        </p>

        <h2>
          Tell us what you
          <span> want to build.</span>
        </h2>

        <p>
          Don't see exactly what you need?
          Contact us and we'll discuss your requirements.
        </p>

        <Link
          href="/contact"
          className="primaryButton"
        >
          Contact Us →
        </Link>

      </section>

    </div>
  );
}