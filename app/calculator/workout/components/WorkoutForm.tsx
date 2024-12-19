// app/calculator/workout/components/WorkoutForm.tsx
"use client";

import { useState, useEffect } from "react";
import WorkoutResponse from "./WorkoutResponse";
import { useAuth } from "../../../context/AuthContext"; // Import the AuthContext hook
import { getDoc, doc } from "firebase/firestore"; 
import { db } from "../../../../firebaseConfig";

const WorkoutForm = () => {
  const { isLoggedIn, userId } = useAuth();
  const [workoutTypes, setWorkoutTypes] = useState<string[]>([]);
  const [filteredWorkoutTypes, setFilteredWorkoutTypes] = useState<string[]>([]);
  const [workoutType, setWorkoutType] = useState<string>("");
  const [sex, setSex] = useState<string>("Male");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [duration, setDuration] = useState<string>("");
  const [durationUnit, setDurationUnit] = useState<string>("mins");
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch workout types on component mount
  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      try {
        const response = await fetch("/api/workoutMet");
        const data = await response.json();
        const workoutList = data.map((item: { workoutType: string }) => item.workoutType);
        setWorkoutTypes(workoutList);
        setFilteredWorkoutTypes(workoutList); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching workout types:", error);
      }
    };

    fetchWorkoutTypes();
  }, []);

  // Fetch user data (sex, age, weight) if the user is logged in
  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn && userId) {
        try {
          const userDocRef = doc(db, "users", userId);
          const userDocSnap = await getDoc(userDocRef);
  
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData) {
              setSex(userData.sex || "Male");
              setAge(userData.age || "");
  
              // Handle weight and unit
            if (userData.weight) {
              const weightMatch = userData.weight.match(/(\d+\.?\d*)\s?(kg|lbs)?/i);
              if (weightMatch) {
                const [, numericWeight, unit] = weightMatch;
                setWeight(numericWeight || ""); // Set numeric part
                setWeightUnit(unit ? unit.toLowerCase() : "kg"); // Default to kg if no unit
              }
            }
          }
        } else {
          console.log("No user document found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  fetchUserData();
}, [isLoggedIn, userId]);
  
  
  // Handle search within dropdown
  const handleSearchChange = (query: string) => {
    setWorkoutType(query);
    const filtered = workoutTypes.filter((type) =>
      type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredWorkoutTypes(filtered);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedWeight = `${weight} ${weightUnit}`;
    const payload = { workoutType, sex, age, height: null, weight: formattedWeight, duration, durationUnit};

    setPrompt(`Workout Type: ${workoutType}\nSex: ${sex}\nAge: ${age}\nWeight: ${formattedWeight}\nDuration: ${duration} ${durationUnit}`);
    setIsLoading(true);
    setResponse("");

    fetch("/api/calculator/workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.response || "No response received.");
      })
      .catch((err) => {
        console.error("Error:", err);
        setResponse("Error occurred while fetching data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  return (
    <div>
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white border border-gray-300 rounded-md shadow-lg shadow-gray-800 text-white">
      <div className="mb-4">
        <label className="block mb-2">Search Workout Type</label>
        <input
          type="text"
          value={workoutType}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-800 rounded"
          placeholder="Type to search workout types"
        />
        {workoutType.trim().length > 0 && filteredWorkoutTypes.length > 0 && (
  <ul className="bg-gray-800 border border-gray-700 rounded mt-2 max-h-40 overflow-y-auto">
    {filteredWorkoutTypes.map((type) => (
      <li
        key={type}
        className={`p-2 cursor-pointer hover:bg-gray-700 ${
          type === workoutType ? "bg-gray-700" : ""
        }`}
        onClick={() => setWorkoutType(type)}
      >
        {type}
      </li>
    ))}
  </ul>
)}
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
          <label className="block text-sm font-semibold mb-2">Duration</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="e.g., 25"
              required
            />
            <select
              value={durationUnit}
              onChange={(e) => setDurationUnit(e.target.value)}
              className="p-2 bg-gray-800 border border-gray-800 rounded-md"
            >
              <option>mins</option>
              <option>hrs</option>
            </select>
          </div>
        </div>
      <button
        type="submit"
        className="w-full py-2 text-gray-900 bg-gray-200 rounded-md hover:bg-cyan-600 hover:text-gray-100 transition duration-200"
      >
        Calculate
      </button>
    </form>
    <WorkoutResponse prompt={prompt} response={response} isLoading={isLoading} />
    </div>
  );
};

export default WorkoutForm;
