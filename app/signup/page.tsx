// app/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("Male");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");

  const handleSignUp = () => {
    // Handle sign up logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-gray-900 border border-cyan-300 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-medium mb-4 text-center">Sign Up</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Sex */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Sex</label>
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

        {/* Age */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="e.g., 25"
            required
          />
        </div>

        {/* Height */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Height</label>
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

        {/* Weight */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Weight</label>
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

        <button
          onClick={handleSignUp}
          className="w-full py-2 bg-gray-200 text-gray-900 font-medium rounded-md hover:bg-cyan-600 hover:text-gray-100 transition duration-200"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-500 hover:text-cyan-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
