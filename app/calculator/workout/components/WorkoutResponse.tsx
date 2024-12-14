// app/calculator/Workout/components/WorkoutResponse.tsx
"use client";

const WorkoutResponse = ({
  prompt,
  response,
  isLoading,
}: {
  prompt: string;
  response: string;
  isLoading: boolean;
}) => {
  return (
    <div className="p-4 bg-gray-900  border-gray-300 text-white border border-gray-600 text-white rounded mt-4">
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2 ">Query</h3>
        <div className="p-3 bg-gray-800 rounded border border-gray-600">
          <p>{prompt || "Waiting for input"}</p>
        </div>
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2 ">Calories Burned</h3>
        <div className="p-3 bg-gray-800 rounded border border-gray-600">
          {isLoading || !response ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-900 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-900 rounded w-1/2"></div>
            </div>
          ) : (
            <p>You have burned <span className="font-semibold text-cyan-300">{response}</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutResponse;
