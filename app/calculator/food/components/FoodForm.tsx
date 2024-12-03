// app/calculator/food/components/FoodForm.tsx
"use client";

import { useState } from "react";

interface FoodFormData {
  foodName: string;
  quantity: string;
  description: string;
}

const FoodForm = ({ onFormSubmit }: { onFormSubmit: (formData: FoodFormData) => void }) => {
  const [foodName, setFoodName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit({ foodName, quantity, description });
  };

  return (
    <form className="p-4 mb-10 bg-gray-900 border border-gray-300 rounded-md-md shadow-lg shadow-gray-800 text-white" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Food Name</label>
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="e.g., Apple"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Quantity</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="e.g., 2 pcs"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Additional details about the food such as ingredients or details of quantity"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-2 text-gray-900 bg-gray-400 rounded-md hover:bg-cyan-600 transition duration-200"
      >
        Calculate
      </button>
    </form>
  );
};

export default FoodForm;
