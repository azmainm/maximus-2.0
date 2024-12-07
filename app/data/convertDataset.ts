import * as fs from "fs";
import * as path from "path";
import foodData from "./foodData.json";

interface FoodNutrient {
  nutrient: {
    name: string;
  };
  amount: number;
}

interface FoodItem {
  description: string;
  foodNutrients: FoodNutrient[];
}

interface FoodData {
  SurveyFoods: FoodItem[];
}

const data = foodData as FoodData;

const convertedData = {
  foods: data.SurveyFoods.map((food: FoodItem) => {
    const nutrients = food.foodNutrients.reduce(
      (acc: { calories?: number; protein?: number; fats?: number; carbs?: number }, nutrient) => {
        switch (nutrient.nutrient.name.toLowerCase()) {
          case "energy":
            acc.calories = nutrient.amount || 0;
            break;
          case "protein":
            acc.protein = nutrient.amount || 0;
            break;
          case "total lipid (fat)":
            acc.fats = nutrient.amount || 0;
            break;
          case "carbohydrate, by difference":
            acc.carbs = nutrient.amount || 0;
            break;
        }
        return acc;
      },
      {}
    );

    return {
      description: food.description,
      nutrients,
    };
  }),
};

const outputPath = path.resolve(__dirname, "convertedFoodData.json");
fs.writeFileSync(outputPath, JSON.stringify(convertedData, null, 2), "utf8");

console.log(`Conversion complete. Saved to ${outputPath}`);
