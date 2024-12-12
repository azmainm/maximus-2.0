// app/ui/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuth } from "../context/AuthContext";

// interface NavbarProps {
//   isLoggedIn: boolean;
//   handleLogout: () => void;
// }

// const Navbar = ({ isLoggedIn, handleLogout }: NavbarProps) => {
  const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const handleSignOut = async () => {
      try {
        await signOut(auth); // Sign out the user using Firebase
        logout(); // Update context state
        router.push("/"); // Redirect to home page
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
  
    const navItems = isLoggedIn
      ? [
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: "Calculator", href: "/calculator/food" },
          { name: "Profile", href: "/profile" },
          { name: "Logout", action: handleSignOut },
        ]
        
      : [
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: "Calculator", href: "/calculator/food" },
          { name: "Login", href: "/login" },
        ];
        console.log(isLoggedIn+" from navbar")
  
    return (
      <nav className="bg-gray-900 text-white">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex items-center">
            <Image src="/images/logo_s2.png" alt="Maximus Logo" width={40} height={40} />
          </div>
  
          <button className="block md:hidden text-white focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? "✖" : "☰"}
          </button>
  
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item, index) =>
              item.action ? (
                <li key={index}>
                  <button onClick={item.action} className="hover:text-cyan-500 transition">
                    {item.name}
                  </button>
                </li>
              ) : (
                <li key={index}>
                  <Link href={item.href} className="hover:text-cyan-500 transition">
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
  
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 text-white px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item, index) =>
                item.action ? (
                  <li key={index}>
                    <button onClick={item.action} className="hover:text-cyan-500 transition">
                      {item.name}
                    </button>
                  </li>
                ) : (
                  <li key={index}>
                    <Link href={item.href} className="hover:text-cyan-500 transition">
                      {item.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </nav>
    );
  };
  

export default Navbar;
