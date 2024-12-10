// app/api/calculator/food/route.ts
import { NextResponse } from "next/server";
import transformedFoodData from "../../../data/transformedFoodData.json";

interface Quantity {
  description: string;
  weight_g: number;
}

interface Food {
  name: string;
  quantities: Quantity[];
}

const foodData: Food[] = transformedFoodData as Food[];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const matchingFoods = foodData.filter((food) =>
    food.name.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json({ foods: matchingFoods });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { foodName, quantity, description } = body;

  if (!foodName || !quantity || !description) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const food = foodData.find((item) => item.name === foodName);

  if (!food) {
    return NextResponse.json({ error: "Food not found" }, { status: 404 });
  }

  // Mock response (in practice, calculate based on quantity)
  const response = {
    calories: (Number(quantity) * 2).toFixed(2), // Example multiplier
    protein: (Number(quantity) * 0.1).toFixed(2),
    carbs: (Number(quantity) * 0.3).toFixed(2),
    fats: (Number(quantity) * 0.05).toFixed(2),
  };

  return NextResponse.json(response);
}
