import json

# Input and output file names
input_file = "./foodData.json"
output_file = "foodDataConverted.json" 

# Define the transformation function
def transform_json(input_data):
    transformed_data = []

    for food in input_data["SurveyFoods"]:
        # Create a dictionary for each food item
        food_item = {
            "Food Code": food.get("foodCode"),
            "Description": food.get("description"),
            "Category": food.get("wweiaFoodCategory", {}).get("wweiaFoodCategoryDescription"),
            "Attributes": {
                attr.get("name", "Unknown"): attr.get("value", "Unknown")
                for attr in food.get("foodAttributes", [])
            },
            "Nutrients": {
                nutrient.get("nutrient", {}).get("name", "Unknown"): nutrient.get("amount", 0)
                for nutrient in food.get("foodNutrients", [])
            },
            "Portions": [
                {
                    "Description": portion.get("portionDescription", "Unknown"),
                    "Weight (g)": portion.get("gramWeight", 0),
                }
                for portion in food.get("foodPortions", [])
            ],
            "Footnote": food.get("footnote"),
        }

        # Append the transformed food item
        transformed_data.append(food_item)

    return transformed_data

# Read the input JSON file
with open(input_file, "r") as infile:
    input_data = json.load(infile)

# Transform the data
transformed_data = transform_json(input_data)

# Write the transformed data to the output JSON file
with open(output_file, "w") as outfile:
    json.dump(transformed_data, outfile, indent=4)

print(f"Transformed data has been saved to {output_file}")
