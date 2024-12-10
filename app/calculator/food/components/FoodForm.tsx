// app/calculator/food/components/FoodForm.tsx
"use client";

import { useState } from "react";

interface Quantity {
  description: string;
  weight_g: number;
}

interface Food {
  name: string;
  quantities: Quantity[];
}

interface FoodFormData {
  foodName: string;
  quantity: string;
  description: string;
}

const FoodForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (formData: FoodFormData) => void;
}) => {
  const [foodName, setFoodName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const fetchSuggestions = async (query: string) => {
    if (query.length > 1) {
      const response = await fetch(`/api/calculator/food?query=${query}`);
      const result = await response.json();
      setSuggestions(result.foods || []);
    } else {
      setSuggestions([]);
    }
  };

  const handleFoodNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFoodName(value);
    fetchSuggestions(value);
  };

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    setFoodName(food.name);
    setSuggestions([]);
    setDescription(food.quantities.map((q) => q.description).join(", "));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFood) return;

    onFormSubmit({
      foodName: selectedFood.name,
      quantity,
      description,
    });
  };

  return (
    <form
      className="p-4 mb-10 bg-gray-900 border border-gray-300 rounded-md shadow-lg shadow-gray-800 text-white"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Food Name</label>
        <input
          type="text"
          value={foodName}
          onChange={handleFoodNameChange}
          className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="e.g., Apple"
          required
        />
        {suggestions.length > 0 && (
          <ul className="bg-gray-700 border border-gray-600 rounded-md mt-2">
            {suggestions.map((food) => (
              <li
                key={food.name}
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleSelectFood(food)}
              >
                {food.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedFood && (
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Quantity</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="" disabled>
              Select Quantity
            </option>
            {selectedFood.quantities.map((q, index) => (
              <option key={index} value={q.weight_g}>
                {q.description} ({q.weight_g} g)
              </option>
            ))}
          </select>
        </div>
      )}
      {/* <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          value={description}
          readOnly
          className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        ></textarea>
      </div> */}
      <button
        type="submit"
        className="w-full py-2 text-gray-900 bg-gray-200 rounded-md hover:bg-cyan-600 hover:text-gray-100 transition duration-200"
      >
        Calculate
      </button>
    </form>
  );
};

export default FoodForm;
