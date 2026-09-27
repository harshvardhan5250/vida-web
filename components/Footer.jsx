"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footerContainer">

        {/* TOP */}

        <div className="footerTop">

          {/* BRAND */}

          <div className="footerBrand">

            <Link href="/" className="logo">
              VIDA<span>WEB</span>
            </Link>

            <p>
              Modern websites for businesses,
              startups and creators.
            </p>

          </div>


          {/* LINKS */}

          <div className="footerLinks">

            <div>

              <h4>
                Explore
              </h4>

              <Link href="/">
                Home
              </Link>

              <Link href="/services">
                Services
              </Link>

              <Link href="/pricing">
                Pricing
              </Link>

              <Link href="/portfolio">
                Portfolio
              </Link>

            </div>


            <div>

              <h4>
                Company
              </h4>

              <Link href="/contact">
                Contact
              </Link>

              <Link href="/login">
                Login
              </Link>

              <Link href="/signup">
                Get Started
              </Link>

              <Link href="/dashboard">
                Dashboard
              </Link>

            </div>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="footerBottom">

          <p>
            © {new Date().getFullYear()} VIDA WEB.
            All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}