// app/calculator/food/components/FoodResponse.tsx
"use client";

const FoodResponse = ({ prompt, response }: { prompt: string; response: string }) => {
  return (
    <div className="p-4 bg-gray-900 text-white rounded mt-4">
      <h3 className="text-lg font-bold mb-2">Prompt</h3>
      <p className="mb-4">{prompt}</p>
      <h3 className="text-lg font-bold mb-2">Response</h3>
      <p>{response}</p>
    </div>
  );
};

export default FoodResponse;
