// app/calculator/workout/page.tsx
"use client";

import { useState } from "react";
import TabSwitcher from "../food/components/TabSwitcher";
import WorkoutForm from "./components/WorkoutForm";
import Navbar from "../../ui/Navbar";

const WorkoutCalculator = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false); 
    window.location.href = "/"; }

  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <TabSwitcher />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl text-gray-100 font-light mb-4 text-center">Workout Calorie Calculator</h1>
        <WorkoutForm />
      </div>
    </div>
  );
};

export default WorkoutCalculator;
