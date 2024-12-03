// app/api/calculator/food/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Mock response using the prompt for demonstration
    const mockResponse = `You entered: ${prompt}\nCalories: 250\nProtein: 10g\nCarbs: 30g\nFats: 10g`;

    return NextResponse.json({ response: mockResponse });
  } catch (error) {
    return NextResponse.json({ error: "Error processing the request." }, { status: 500 });
  }
}
