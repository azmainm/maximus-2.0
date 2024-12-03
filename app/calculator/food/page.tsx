// app/calculator/food/page.tsx
"use client";

import { useState } from "react";
import TabSwitcher from "./components/TabSwitcher";
import FoodForm from "./components/FoodForm";
import FoodResponse from "./components/FoodResponse";

interface FoodFormData {
  foodName: string;
  quantity: string;
  description: string;
}

const FoodCalculator = () => {
  const [prompt, setPrompt] = useState(""); // Stores the formatted prompt
  const [response, setResponse] = useState(""); // Stores the response
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state

  const handleFormSubmit = (formData: FoodFormData) => {
    const formattedPrompt = `Food: ${formData.foodName}\nQuantity: ${formData.quantity}\nDescription: ${formData.description}`;
    setPrompt(formattedPrompt);
    setIsLoading(true);

    fetch("/api/calculator/food", {
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
      <TabSwitcher />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl text-cyan-100 font-light mb-4 text-center">Food Macro Calculator</h1>
        <FoodForm onFormSubmit={handleFormSubmit} />
        {/* Render FoodResponse with placeholders until data is updated */}
        <FoodResponse
          prompt={prompt || "Waiting for input"} // Default placeholder
          response={response || (isLoading ? "" : "No response yet")}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FoodCalculator;
