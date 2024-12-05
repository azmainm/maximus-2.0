// app/ui/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Navbar = ({ isLoggedIn, handleLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = isLoggedIn
    ? [
        { name: "Home", href: "/" },
        { name: "Calculator", href: "/calculator/food" },
        { name: "Blog", href: "/blog" },
        { name: "Profile", href: "/profile" },
        { name: "Logout", href: "#", action: handleLogout },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Calculator", href: "/calculator/food" },
        { name: "Blog", href: "/blog" },
        { name: "Login", href: "/login" },
      ];

  return (
    <nav className="bg-gray-900 text-white">
      <div className="flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logo_s.png"
            alt="Maximus Logo"
            width={40}
            height={40}
          />
        </div>

        {/* Hamburger Menu */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.action ? (
                <button
                  onClick={item.action}
                  className="hover:text-cyan-500 transition"
                >
                  {item.name}
                </button>
              ) : (
                <Link href={item.href} className="hover:text-cyan-500 transition">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-4">
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.action ? (
                  <button
                    onClick={item.action}
                    className="hover:text-cyan-500 transition"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link href={item.href} className="hover:text-cyan-500 transition">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
