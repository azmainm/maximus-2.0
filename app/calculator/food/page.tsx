// app/calculator/food/page.tsx
"use client";

import { useState } from "react";
import TabSwitcher from "./components/TabSwitcher";
import FoodForm from "./components/FoodForm";
import FoodResponse from "./components/FoodResponse";
import Navbar from "../../ui/Navbar";

interface FoodFormData {
  foodName: string;
  quantity: string;
  description: string;
}

interface NutritionalResponse {
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

const FoodCalculator = () => {
  const [prompt, setPrompt] = useState(""); // Stores the formatted prompt
  const [response, setResponse] = useState<NutritionalResponse | null>(null); // Stores the response
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state

  const handleFormSubmit = async (formData: FoodFormData) => {
    const { foodName, quantity, description } = formData; // Get these values directly
  
    setPrompt(`${foodName}, ${quantity}, ${description}`);
    setIsLoading(true);
  
    try {
      // Send the data directly without wrapping it in a "prompt" object
      const response = await fetch("/api/calculator/food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodName, quantity, description }), // Correct the payload
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setResponse(result); // Assuming the entire response is the nutritional data
      } else {
        setResponse(null);
        console.error(result.error || "An error occurred while fetching the response.");
      }
    } catch (error) {
      setResponse(null);
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <TabSwitcher />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl text-gray-100 font-light mb-4 text-center">Nutrients Calculator</h1>
        <FoodForm onFormSubmit={handleFormSubmit} />
        {/* Render FoodResponse with placeholders until data is updated */}
        <FoodResponse
          prompt={prompt || "Waiting for input"} // Default placeholder
          response={response}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FoodCalculator;
