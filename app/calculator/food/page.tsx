// app/calculator/food/page.tsx
"use client";

import { useState } from "react";
import TabSwitcher from "./components/TabSwitcher";
import FoodForm from "./components/FoodForm";
import FoodResponse from "./components/FoodResponse";

const FoodCalculator = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleFormSubmit = (formData: any) => {
    const formattedPrompt = `Food: ${formData.foodName}\nQuantity: ${formData.quantity}\nDescription: ${formData.description}`;
    setPrompt(formattedPrompt);

    // Simulated response
    fetch("/api/calculator/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: formattedPrompt }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.response))
      .catch(() => setResponse("Error: Unable to fetch response."));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <TabSwitcher />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Food Calorie Calculator</h1>
        <FoodForm onFormSubmit={handleFormSubmit} />
        {prompt && <FoodResponse prompt={prompt} response={response} />}
      </div>
    </div>
  );
};

export default FoodCalculator;
