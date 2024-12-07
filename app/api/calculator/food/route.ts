// app/api/calculator/food/route.ts
import { NextResponse } from "next/server";
import foodData from "../../../data/foodDataConverted.json";

interface NutrientData {
  ENERC_KCAL?: number;
  PROCNT?: number;
  FAT?: number;
  CHOCDF?: number;
}

interface FoodItem {
  description: string;
  nutrients: NutrientData;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const [foodName, quantityStr, ...descriptionParts] = prompt.split(",").map((s: string) => s.trim());
    const quantity = parseFloat(quantityStr.replace(/[^0-9.]/g, "")); // Extract numeric value from quantity
    const description = descriptionParts.join(", ");

    if (isNaN(quantity)) {
      return NextResponse.json(
        { error: "Quantity must be a valid number" },
        { status: 400 }
      );
    }

    // Search for matching food items in the JSON
    const matches = (foodData as FoodItem[]).filter((item) =>
      item.description.toLowerCase().includes(foodName.toLowerCase())
    );
    console.log(foodData);


    if (matches.length === 0) {
      return NextResponse.json(
        { error: "Food not found in the database" },
        { status: 404 }
      );
    }

    // Calculate total nutrition based on matches
    const totalNutrients: NutrientData = { ENERC_KCAL: 0, PROCNT: 0, FAT: 0, CHOCDF: 0 };

    matches.forEach((match) => {
      const factor = quantity / 100; // Assuming the nutrients are per 100g
      totalNutrients.ENERC_KCAL! += (match.nutrients.ENERC_KCAL || 0) * factor;
      totalNutrients.PROCNT! += (match.nutrients.PROCNT || 0) * factor;
      totalNutrients.FAT! += (match.nutrients.FAT || 0) * factor;
      totalNutrients.CHOCDF! += (match.nutrients.CHOCDF || 0) * factor;
    });

    // Include the description in the response for assumptions
    return NextResponse.json({
      response: {
        calories: totalNutrients.ENERC_KCAL!.toFixed(2),
        protein: totalNutrients.PROCNT!.toFixed(2),
        carbs: totalNutrients.CHOCDF!.toFixed(2),
        fats: totalNutrients.FAT!.toFixed(2),
        assumptions: description || "No additional details provided.",
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
