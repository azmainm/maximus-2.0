// app/calculator/food/components/WorkoutForm.tsx
"use client";

import { useState } from "react";

interface WorkoutFormData {
  workoutType: string;
  sex: string;
  age: string;
  height: string;
  weight: string;
  description: string;
}

const WorkoutForm = ({ onFormSubmit }: { onFormSubmit: (formData: WorkoutFormData) => void }) => {
  const [workoutType, setWorkoutType] = useState<string>("Weight Training");
  const [sex, setSex] = useState<string>("Male");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<string>("cm");
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedHeight = `${height} ${heightUnit}`;
    const formattedWeight = `${weight} ${weightUnit}`;
    onFormSubmit({ workoutType, sex, age, height: formattedHeight, weight: formattedWeight, description });
  };

  return (
    <form className="p-4 mb-10 bg-gray-900 border border-gray-300 rounded-md-md shadow-lg shadow-gray-800 text-white" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Workout Type</label>
        <select
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option>Weight Training</option>
          <option>Bodyweight Training</option>
          <option>Rope Jumping</option>
          <option>Running</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Sex</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="sex"
              value="Male"
              checked={sex === "Male"}
              onChange={(e) => setSex(e.target.value)}
            />
          Male
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="Female"
              checked={sex === "Female"}
              onChange={(e) => setSex(e.target.value)}
            />
             Female
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="e.g., 25"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Height</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="e.g., 170"
            required
          />
          <select
            value={heightUnit}
            onChange={(e) => setHeightUnit(e.target.value)}
            className="p-2 bg-gray-800 border border-gray-800 rounded-md"
          >
            <option>cm</option>
            <option>ft & in</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Weight</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="e.g., 70"
            required
          />
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className="p-2 bg-gray-800 border border-gray-800 rounded-md"
          >
            <option>kg</option>
            <option>lbs</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Details about your workout goal or activity"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-2 text-gray-900 bg-gray-200 rounded-md hover:bg-cyan-600 hover:text-gray-100 transition duration-200"
      >
        Calculate
      </button>
    </form>
  );
};

export default WorkoutForm;
