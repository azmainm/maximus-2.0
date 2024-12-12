/* FeatureCards.tsx*/
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

  const buttonClickVariant = {
    click: {
      scale: [1, 100],
      rotate: [0, 360],
      backgroundColor: "#FFFFFF", // Make the button fully white
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      router.push("/blog");
    }, 2000);
  };

  return (
    <div id="features" className=" bg-black text-center">
      <h2 className="text-3xl font-light mb-8 text-white">Our Features</h2>
      <div className="flex flex-wrap justify-center gap-4 px-4">
  {features.map((feature, index) => (
    <div
    key={index}
    className="bg-black px-3 py-3 sm:p-6 rounded-lg border border-gray-800 shadow-lg hover:scale-110 transition-transform duration-300 w-full sm:w-[250px] md:w-[300px] flex flex-col items-center"
  >
    <div className="mb-4">{feature.icon}</div>
    <h3 className="text-2xl text-white font-semibold mb-4">{feature.title}</h3>
    <p className="text-white">{feature.description}</p>
  </div>
  ))}
</div>


      <motion.button
        onClick={handleButtonClick}
        className={`mt-20 px-14 py-6 text-xl text-white border border-white rounded-xl ${
          isButtonClicked ? "bg-white text-transparent" : ""
        } hover:bg-cyan-600 hover:scale-105 transition ease-in-out duration-300`}
        whileTap="click"
        initial="visible"
        animate={isButtonClicked ? "click" : "visible"}
        variants={buttonClickVariant}
      >
        Breathe in
      </motion.button>
    </div>
  );
};

export default FeatureCards;
