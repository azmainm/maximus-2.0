// app/calculator/food/components/TabSwitcher.tsx
"use client";

import Link from "next/link";

const TabSwitcher = () => {
  return (
    <div className="flex justify-center gap-6 p-4 bg-gray-800 text-white">
      <Link href="/calculator/food">
        <button className="py-2 px-4 bg-cyan-600 rounded hover:bg-cyan-500">
          Food Calculator
        </button>
      </Link>
      <Link href="/calculator/workout">
        <button className="py-2 px-4 bg-cyan-600 rounded hover:bg-cyan-500">
          Workout Calculator
        </button>
      </Link>
    </div>
  );
};

export default TabSwitcher;
