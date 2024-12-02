// app/calculator/food/components/FoodForm.tsx
"use client";

import { useState } from "react";

const FoodForm = ({ onFormSubmit }: { onFormSubmit: (formData: any) => void }) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit({ foodName, quantity, description });
  };

  return (
    <form className="p-4 bg-gray-900 text-white rounded" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Food Name</label>
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Quantity</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        ></textarea>
      </div>
      <button type="submit" className="w-full py-2 bg-cyan-600 rounded hover:bg-cyan-500">
        Calculate
      </button>
    </form>
  );
};

export default FoodForm;
