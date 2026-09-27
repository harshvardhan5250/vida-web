export default function Footer() {
  return (
    <footer className="footer">

      <div className="footerContainer">

        <div className="footerBrand">
          <h2>VIDA<span>WEB</span></h2>

          <p>
            We build modern, fast and professional websites
            for businesses, creators and startups.
          </p>
        </div>

        <div className="footerLinks">
          <h3>Company</h3>

          <a href="/services">Services</a>
          <a href="/pricing">Pricing</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footerLinks">
          <h3>Account</h3>

          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>

      </div>

      <div className="copyright">
        © {new Date().getFullYear()} VIDA WEB. All rights reserved.
      </div>

    </footer>
  );
}