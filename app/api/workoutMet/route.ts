// app/api/workoutMet/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "app/data/workoutMet.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const workoutMetData = JSON.parse(fileData);

    return NextResponse.json(workoutMetData);
  } catch (err) {
    console.error("Error reading workout data:", err); // Log error for debugging
    return NextResponse.json(
      { error: "Error reading workout data" },
      { status: 500 }
    );
  }
}
