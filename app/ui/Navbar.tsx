// app/ui/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Navbar = ({ isLoggedIn, handleLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user using Firebase
      handleLogout(); // Update parent state to reflect logged-out status
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = isLoggedIn
    ? [
        { name: "Home", href: "/" },
        { name: "Calculator", href: "/calculator/food" },
        { name: "Blog", href: "/blog" },
        { name: "Profile", href: "/profile" },
        { name: "Logout", action: handleSignOut },
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
            src="/images/logo_s2.png"
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
