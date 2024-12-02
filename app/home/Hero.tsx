/* Hero.tsx*/
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div className="h-[70vh] flex flex-col justify-center items-center bg-black text-white">
      <div className="flex items-center mb-6">
        <Image src="/images/logo.png" alt="Logo" width={120} height={120} />
      </div>
      <h2 className="font-poppins text-4xl font-medium mb-4 text-center">
            Shape Your
    </h2>
      <div className="text-center font-bold mb-8">
        <motion.h1
          className="font-poppins text-7xl inline-block"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
        >
          Body.
        </motion.h1>
        <motion.h1
          className="font-poppins text-7xl inline-block mx-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
        >
          Mind.
        </motion.h1>
        <motion.h1
          className="font-poppins text-7xl inline-block text-cyan-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.2, ease: "easeInOut" }}
        >
          Future.
        </motion.h1>
      </div>
      <motion.button
  onClick={scrollToFeatures}
  className="flex items-center justify-center w-0 h-0 border border-white rounded-full hover:bg-cyan-600 hover:scale-110 transition-transform duration-300"
>
  <span className="text-white text-3xl">↓</span>
</motion.button>

    </motion.div>
  );
};

export default Hero;
