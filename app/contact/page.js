"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      setSuccess(
        "Your message has been sent successfully. We'll contact you soon."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.message || "Unable to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contactPage">

      {/* HERO */}

      <section className="contactHero">
        <div className="contactHeroContent">
          <p className="sectionLabel">GET IN TOUCH</p>

          <h1>
            Let&apos;s Build
            <br />
            <span>Something Great.</span>
          </h1>

          <p className="contactHeroText">
            Have a website idea, business project or
            just want to discuss something? Tell us about
            it and the VIDA WEB team will get back to you.
          </p>
        </div>
      </section>


      {/* CONTACT SECTION */}

      <section className="contactSection">

        {/* LEFT SIDE */}

        <div className="contactInfo">

          <div className="contactInfoBlock">
            <p className="sectionLabel">CONTACT</p>

            <h2>
              Start a conversation
            </h2>

            <p>
              Whether you need a business website,
              portfolio, landing page or custom web
              solution, we&apos;re here to help.
            </p>
          </div>


          <div className="contactDetails">

            <div className="contactDetail">
              <span>EMAIL</span>
              <a href="mailto:hello@vida-web.in">
                hello@vida-web.in
              </a>
            </div>

            <div className="contactDetail">
              <span>RESPONSE TIME</span>
              <p>
                Usually within 24 hours
              </p>
            </div>

            <div className="contactDetail">
              <span>AVAILABLE FOR</span>
              <p>
                Websites · Landing Pages ·
                E-commerce · Custom Projects
              </p>
            </div>

          </div>

        </div>


        {/* FORM */}

        <div className="contactFormWrapper">

          <form
            className="contactForm"
            onSubmit={handleSubmit}
          >

            <div className="formRow">

              <div className="formGroup">
                <label htmlFor="name">
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="formGroup">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>


            <div className="formGroup">
              <label htmlFor="subject">
                Subject
              </label>

              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="What do you want to discuss?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>


            <div className="formGroup">
              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your project..."
                rows="7"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>


            {success && (
              <div className="contactSuccess">
                {success}
              </div>
            )}


            {error && (
              <div className="contactError">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="contactSubmit"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Message →"}
            </button>

          </form>

        </div>

      </section>


      {/* CTA */}

      <section className="contactCTA">

        <p className="sectionLabel">
          VIDA WEB
        </p>

        <h2>
          Have an idea?
          <br />
          Let&apos;s make it real.
        </h2>

        <p>
          Tell us what you need and we&apos;ll figure out
          the best way to build it.
        </p>

      </section>

    </div>
  );
}