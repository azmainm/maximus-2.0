// app/calculator/workout/page.tsx
"use client";

import { useState } from "react";
import TabSwitcher from "../food/components/TabSwitcher";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutResponse from "./components/WorkoutResponse";
import Navbar from "../../ui/Navbar";

interface WorkoutFormData {
  workoutType: string;
  sex: string;
  age: string;
  height: string;
  weight: string;
  duration: string;
}

const WorkoutCalculator = () => {
  const [prompt, setPrompt] = useState(""); // Stores the formatted prompt
  const [response, setResponse] = useState(""); // Stores the response
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const isLoggedIn = true; // Replace with actual authentication logic
  const handleLogout = () => {
    console.log("Logout logic here");
  };

  const handleFormSubmit = (formData: WorkoutFormData) => {
    const formattedPrompt = `Workout Type: ${formData.workoutType}\nSex: ${formData.sex}\nAge: ${formData.age}\nHeight: ${formData.height}\nWeight: ${formData.weight}\nDescription: ${formData.duration}`;
    setPrompt(formattedPrompt);
    setIsLoading(true);

    fetch("/api/calculator/workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: formattedPrompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.response);
        setIsLoading(false);
      })
      .catch(() => {
        setResponse("Error: Unable to fetch response.");
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <TabSwitcher />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl text-gray-100 font-light mb-4 text-center">Workout Calorie Calculator</h1>
        <WorkoutForm onFormSubmit={handleFormSubmit} />
        <WorkoutResponse
          prompt={prompt || "Waiting for input"} // Default placeholder
          response={response || (isLoading ? "" : "No response yet")}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default WorkoutCalculator;
