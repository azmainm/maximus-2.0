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
    const timer = setTimeout(() => setLoading(false), 1800); // Simulate loading time
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [pathname]); // Only depend on pathname as quotes are constants

  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('/images/background_loader.jpg')", // Set background image
        backgroundSize: "cover", // Ensure the image covers the entire area
        backgroundPosition: "center", // Center the image
        backgroundAttachment: "fixed", // Keep the image fixed while scrolling
        flexDirection: "column", // Stack elements vertically
        color: "white", // Text color
        fontFamily: "Arial, sans-serif", // Set a clean font
        padding: "0 20px", // Add padding to prevent text from touching sides
        position: "relative", // To place the overlay
      }}
    >
      <div
        style={{
          position: "absolute", // Position the overlay over the image
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Add transparent layer
          zIndex: 1, // Ensure overlay is above the image but behind the content
        }}
      />
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

      {/* Media Queries for Responsiveness */}
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            padding: 0 10px; // Reduce padding on mobile
          }
          p {
            font-size: 16px; // Adjust font size for smaller screens
            margin-top: 20px; // Reduce top margin on mobile
          }
          .react-spinner-climbing-box-loader {
            margin-top: 20px; // Adjust spacing between loader and quote
          }
        }
        
        @media (max-width: 480px) {
          p {
            font-size: 14px; // Further reduce font size for very small screens
            max-width: 80%; // Reduce max-width to avoid overflow
            margin-top: 15px; // Further reduce margin on small screens
          }
        }
      `}</style>
    </div>
  ) : (
    <>{children}</>
  );
}
