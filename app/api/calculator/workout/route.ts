// app/api/calculator/workout/route.ts
import { NextResponse } from "next/server";

// MET dataset
const workoutMetData = [
  { workoutType: "Weight Training", met: 6.0 },
  { workoutType: "Bodyweight Training", met: 5.0 },
  { workoutType: "Rope Jumping", met: 12.3 },
  { workoutType: "Running", met: 9.8 },
];

export async function POST(req: Request) {
  try {
    const { workoutType, weight, duration } = await req.json();

    // Find MET value for the selected workout type
    const workout = workoutMetData.find((item) => item.workoutType === workoutType);
    if (!workout) {
      return NextResponse.json({ error: "Invalid workout type" }, { status: 400 });
    }

    const met = workout.met;

    // Convert duration from minutes to hours
    const durationHours = parseFloat(duration) / 60;

    // Calculate calories burned
    const weightKg = parseFloat(weight);
    const caloriesBurned = met * weightKg * durationHours;

    return NextResponse.json({ caloriesBurned });
  } catch (error) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
