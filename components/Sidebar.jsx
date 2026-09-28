"use client";

import Link from "next/link";

export default function Sidebar({
  active = "",
}) {
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
    },
    {
      name: "Payments",
      href: "/dashboard/payments",
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebarLogo">
        <span>VIDA</span> WEB
      </div>

      <nav className="sidebarNav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              active === link.name.toLowerCase()
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="sidebarBottom">
        <Link
          href="/"
          className="sidebarLogout"
        >
          Back to Website
        </Link>
      </div>
    </aside>
  );
}