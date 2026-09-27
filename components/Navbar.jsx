"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navContainer">

        <Link href="/" className="logo">
          VIDA<span>WEB</span>
        </Link>

        <nav className="navLinks">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="navButtons">
          <Link href="/login" className="loginButton">
            Login
          </Link>

          <Link href="/signup" className="signupButton">
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}