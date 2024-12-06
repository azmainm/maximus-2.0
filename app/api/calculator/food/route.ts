import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_FOOD, // Set this in .env.local
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Create completion using OpenAI
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150, // Adjust as needed
      temperature: 0.7, // Creativity level
    });

    const responseText = completion.choices[0]?.text?.trim() || "No response";

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing the request." },
      { status: 500 }
    );
  }
}
