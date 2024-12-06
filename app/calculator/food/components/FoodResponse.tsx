// app/calculator/food/components/FoodResponse.tsx
"use client";

const FoodResponse = ({
  prompt,
  response,
  isLoading,
}: {
  prompt: string;
  response: string;
  isLoading: boolean;
}) => (
  <div className="p-4 bg-gray-900 border border-gray-600 text-white rounded mt-4">
    <div className="mb-6">
      <h3 className="text-md font-semibold mb-2">Prompt</h3>
      <div className="p-3 bg-gray-800 rounded border border-gray-700">
        <p>{prompt || "Waiting for input"}</p>
      </div>
    </div>
    <div>
      <h3 className="text-md font-semibold mb-2">Response</h3>
      <div className="p-3 bg-gray-800 rounded border border-gray-700">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        ) : (
          <p>{response}</p>
        )}
      </div>
    </div>
  </div>
);

export default FoodResponse;
