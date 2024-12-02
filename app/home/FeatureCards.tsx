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
      title: "Food Calculator",
      description: "Track your meals and macros.",
      icon: <FaAppleAlt className="text-white text-5xl mb-4" />,
    },
    {
      title: "Workout Calculator",
      description: "Plan and track workouts.",
      icon: <FaDumbbell className="text-white text-5xl mb-4" />,
    },
    {
      title: "Blog",
      description: "Read articles on health and fitness.",
      icon: <FaBook className="text-white text-5xl mb-4" />,
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
      router.push("/calculators/food");
    }, 2000);
  };

  return (
    <div id="features" className="py-16 bg-black text-center">
      <h2 className="text-4xl font-bold mb-8 text-white">Our Features</h2>
      <div className="flex flex-wrap justify-center gap-4 px-4">
  {features.map((feature, index) => (
    <div
    key={index}
    className="bg-black p-4 sm:p-6 rounded-lg border border-white shadow-lg hover:scale-110 transition-transform duration-300 w-full sm:w-[250px] md:w-[300px] flex flex-col items-center"
  >
    <div className="mb-4">{feature.icon}</div>
    <h3 className="text-2xl text-white font-semibold mb-4">{feature.title}</h3>
    <p className="text-white">{feature.description}</p>
  </div>
  
  ))}
</div>


      <motion.button
        onClick={handleButtonClick}
        className={`mt-8 px-14 py-6 text-xl text-white border border-white rounded-lg ${
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