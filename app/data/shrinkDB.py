import json

# Load the JSON file
with open("foodDataConverted.json", "r") as file:
    food_data = json.load(file)

# Transform the data
transformed_data = []
for item in food_data:
    food_entry = {
        "name": item.get("Description"),
        "quantities": [
            {
                "description": portion.get("Description"),
                "weight_g": portion.get("Weight (g)")
            }
            for portion in item.get("Portions", [])
        ],
        "nutrients": item.get("Nutrients", {})  # Include all nutrients
    }
    transformed_data.append(food_entry)

# Save the transformed data to a new JSON file
with open("transformedFoodData.json", "w") as file:
    json.dump(transformed_data, file, indent=4)

print("Transformed data has been saved to 'transformedFoodData.json'")
