// app/components/LoaderWrapper.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
    const timer = setTimeout(() => setLoading(false), 1800); // Simulate loading time
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [pathname]); // Only depend on pathname as quotes are constants

  return loading ? (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {/* Optimized Image */}
      <Image
        src="/images/background_loader.webp"
        alt="Loader Background"
        layout="fill" // Fills the container
        objectFit="cover" // Ensures the image covers the entire area
        quality={75} // Adjust quality for faster loads
        priority // Ensures the image is loaded ASAP
        placeholder="blur"
        blurDataURL="/images/low-res-blur.jpg" 
      />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        zIndex: 1, // Content above the image
        color: "white",
      }}
    >
      <ClimbingBoxLoader color="#d1d5db" size={25} /> {/* Larger loader */}
      <p
        style={{
          marginTop: "40px",
          fontSize: "18px",
          fontStyle: "italic",
          textAlign: "center", // Center-align the text
          wordWrap: "break-word", // Ensure long quotes wrap correctly
          maxWidth: "90%", // Limit the width to make it more responsive
          zIndex: 2, // Ensure quote text appears above the overlay
        }}
      >
        {quote}
      </p>

      </div>
    </div>
  ) : (
    <>{children}</>
  );
}