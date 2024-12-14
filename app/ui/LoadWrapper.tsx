// app/components/LoaderWrapper.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { usePathname } from "next/navigation";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<string>("");
  const pathname = usePathname(); // Detects the current route

  // Defining quotes outside the useEffect to prevent unnecessary re-renders
  const quotes = [
    "What we do in life echoes in eternity",
    "The soul becomes dyed with the color of its thoughts.",
    "Strength and honor.",
    "You have power over your mind, not outside events. Realize this, and you will find strength.",
    "The true man is revealed in the way he bears up under suffering and hardship."
  ];

  useEffect(() => {
    setLoading(true); // Show loader on route change
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]); // Randomly select a quote
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [pathname]); // Only depend on pathname as quotes are constants

  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#111827", // Updated background color
        flexDirection: "column", // Stack elements vertically
        color: "white", // Text color
        fontFamily: "Arial, sans-serif", // Set a clean font
      }}
    >
      <ClimbingBoxLoader color="#00FFFF" size={25} /> {/* Larger loader */}
      <p style={{ marginTop: "40px", fontSize: "18px", fontStyle: "italic" }}>
        {quote} {/* Display the randomly selected quote */}
      </p>
    </div>
  ) : (
    <>{children}</>
  );
}
