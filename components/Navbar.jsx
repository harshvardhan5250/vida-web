"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const [user, setUser] = useState(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setMenuOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="navbar">

      <div className="navContainer">

        {/* LOGO */}

        <Link
          href="/"
          className="logo"
          onClick={closeMenu}
        >
          VIDA<span>WEB</span>
        </Link>


        {/* DESKTOP NAVIGATION */}

        <nav className="navLinks">

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

          <Link href="/contact">
            Contact
          </Link>

        </nav>


        {/* DESKTOP BUTTONS */}

        <div className="navButtons">

          {user === undefined ? null : user ? (
            <>
              <Link
                href="/dashboard"
                className="loginButton"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="signupButton"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="loginButton"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="signupButton"
              >
                Get Started
              </Link>
            </>
          )}

        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className="mobileMenuButton"
          onClick={() =>
            setMenuOpen((prev) => !prev)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* MOBILE MENU */}

      <div
        className={`mobileMenu ${
          menuOpen ? "mobileMenuOpen" : ""
        }`}
      >

        <Link
          href="/"
          onClick={closeMenu}
        >
          Home
        </Link>

        <Link
          href="/services"
          onClick={closeMenu}
        >
          Services
        </Link>

        <Link
          href="/pricing"
          onClick={closeMenu}
        >
          Pricing
        </Link>

        <Link
          href="/portfolio"
          onClick={closeMenu}
        >
          Portfolio
        </Link>

        <Link
          href="/contact"
          onClick={closeMenu}
        >
          Contact
        </Link>


        <div className="mobileMenuButtons">

          {user === undefined ? null : user ? (
            <>
              <Link
                href="/dashboard"
                className="loginButton"
                onClick={closeMenu}
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="signupButton"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="loginButton"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="signupButton"
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </>
          )}

        </div>

      </div>

    </header>
  );
}