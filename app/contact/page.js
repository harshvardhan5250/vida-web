import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="contactPage">

      {/* HERO */}

      <section className="contactHero">

        <p className="sectionLabel">
          GET IN TOUCH
        </p>

        <h1>
          Let's build
          <br />
          <span>something great.</span>
        </h1>

        <p>
          Tell us about your idea, requirements and budget.
          We'll get back to you and discuss the project.
        </p>

      </section>


      {/* CONTACT AREA */}

      <section className="contactSection">

        <div className="contactContainer">

          {/* LEFT */}

          <div className="contactInfo">

            <p className="sectionLabel">
              CONTACT US
            </p>

            <h2>
              Have a project
              <span> in mind?</span>
            </h2>

            <p className="contactDescription">
              Whether you need a business website, online store,
              portfolio or custom web application, tell us what
              you want to build.
            </p>


            <div className="contactDetails">

              <div className="contactDetail">
                <span>Email</span>
                <p>hello@vida-web.in</p>
              </div>

              <div className="contactDetail">
                <span>Response Time</span>
                <p>Within 24 hours</p>
              </div>

              <div className="contactDetail">
                <span>Working Hours</span>
                <p>Mon - Sat / 10 AM - 7 PM</p>
              </div>

            </div>

          </div>


          {/* RIGHT FORM */}

          <div className="contactFormBox">

            <form className="contactForm">

              <div className="formRow">

                <div className="inputGroup">
                  <label>Full Name</label>

                  <input
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="inputGroup">
                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

              </div>


              <div className="inputGroup">
                <label>Phone Number</label>

                <input
                  type="tel"
                  placeholder="Your phone number"
                />
              </div>


              <div className="inputGroup">
                <label>What do you want to build?</label>

                <select defaultValue="" required>

                  <option value="" disabled>
                    Select a service
                  </option>

                  <option value="business">
                    Business Website
                  </option>

                  <option value="ecommerce">
                    E-Commerce Website
                  </option>

                  <option value="portfolio">
                    Portfolio Website
                  </option>

                  <option value="webapp">
                    Custom Web Application
                  </option>

                  <option value="other">
                    Something Else
                  </option>

                </select>

              </div>


              <div className="inputGroup">
                <label>Budget</label>

                <select defaultValue="" required>

                  <option value="" disabled>
                    Select your budget
                  </option>

                  <option value="15k">
                    ₹15,000 - ₹20,000
                  </option>

                  <option value="20k">
                    ₹20,000 - ₹30,000
                  </option>

                  <option value="30k">
                    ₹30,000+
                  </option>

                  <option value="custom">
                    Not Sure
                  </option>

                </select>

              </div>


              <div className="inputGroup">
                <label>Project Details</label>

                <textarea
                  placeholder="Tell us about your project..."
                  rows="6"
                  required
                ></textarea>

              </div>


              <button
                type="submit"
                className="contactButton"
              >
                Send Project Request →
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="contactCTA">

        <p className="sectionLabel">
          READY TO START?
        </p>

        <h2>
          Your idea is
          <span> one step away.</span>
        </h2>

        <Link
          href="/signup"
          className="primaryButton"
        >
          Create Your Account →
        </Link>

      </section>

    </div>
  );
}