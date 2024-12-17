/* FeatureCards.tsx */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaAppleAlt, FaDumbbell, FaBook } from "react-icons/fa";

const FeatureCards = () => {
  const router = useRouter();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const features = [
    {
      title: "Nutrition Calculator",
      description: "Track your meals and macros.",
      icon: <FaAppleAlt className="text-gray-300 text-5xl mb-4" />,
    },
    {
      title: "Workout Calculator",
      description: "Find out how effective your workout was.",
      icon: <FaDumbbell className="text-gray-300 text-5xl mb-4" />,
    },
    {
      title: "Blog",
      description: "Read articles on health, fitness and well-being.",
      icon: <FaBook className="text-gray-300 text-5xl mb-4" />,
    },
  ];

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      router.push("/blog");
    }, 1000);
  };

  return (
    <div id="features" className="bg-gray-950 text-center">
      <h2 className="text-3xl font-light mb-8 text-white">Our Features</h2>
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-950 px-3 py-3 sm:p-6 rounded-lg border border-gray-800 shadow-lg hover:scale-110 transition-transform duration-300 w-full sm:w-[250px] md:w-[300px] flex flex-col items-center"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-2xl text-white font-semibold mb-4">
              {feature.title}
            </h3>
            <p className="text-white p-3">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Button with 3D Projection Effect */}
      <motion.button
        onClick={handleButtonClick}
        className={`relative mt-20 px-24 py-12 text-xl text-white border border-white rounded-xl overflow-hidden
        ${isButtonClicked ? "bg-white text-transparent" : "hover:bg-cyan-600"}`}
        whileTap={{ rotateX: 180 }}
        initial="visible"
      >
        <span
          className={`absolute inset-0 flex items-center justify-center font-light text-2xl transition-transform
          duration-700 ease-in-out ${isButtonClicked ? "scale-110" : "scale-100"}`}
          style={{
            color: isButtonClicked ? "#000000" : "#ffffff",
          }}
        >
          {isButtonClicked ? "Breathe Out" : "Breathe In"}
        </span>
      </motion.button>
    </div>
  );
};

export default FeatureCards;
