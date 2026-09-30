import Link from "next/link";

export default function HomePage() {
  return (
    <main className="homePage">
      <section className="homeHero">
        <p className="sectionLabel">VIDA WEB</p>

        <h1>
          Build your
          <br />
          <span>digital presence.</span>
        </h1>

        <p className="homeHeroText">
          Modern, responsive and professional websites
          for businesses, creators and startups.
        </p>

        <div className="homeButtons">
          <Link href="/signup" className="dashboardButton">
            Get Started →
          </Link>

          <Link href="/login" className="secondaryButton">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}