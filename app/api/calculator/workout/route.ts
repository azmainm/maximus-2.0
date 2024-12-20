// app/api/calculator/workout/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received data:", data); 

    const { workoutType, sex, age, weight, duration, durationUnit } = data;

    if (!workoutType || !sex || !age || !weight || !duration || !durationUnit) {
      console.error("Validation error: Missing fields"); 
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }


    const filePath = path.join(process.cwd(), "app/data/workoutMet.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const workoutMetData = JSON.parse(fileData);

    const workout = workoutMetData.find(
      (item: { workoutType: string }) => item.workoutType === workoutType
    );
    

    if (!workout) {
      return NextResponse.json(
        { error: "Workout type not found" },
        { status: 404 }
      );
    }

    const met = workout.met;
    const weightInKg = weight.includes("lbs")
  ? parseFloat(weight) * 0.453592
  : parseFloat(weight.replace(" kg", "")); // Default to kg

    const durationInMinutes = durationUnit === "hrs" ? parseFloat(duration) * 60 : parseFloat(duration);

    const caloriesBurned =
      ((met * 3.5 * weightInKg) / 200) * durationInMinutes;

    return NextResponse.json({ response: `${caloriesBurned.toFixed(2)} kcal` });
  } catch (err) {
    console.error("Error processing request:", err); // Log error for debugging
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
