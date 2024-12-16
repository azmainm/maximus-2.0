// app/calculator/food/components/TabSwitcher.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TabSwitcher = () => {
  const pathname = usePathname();

  const getButtonClass = (path: string) =>
    `py-1 px-4 ${
      pathname === path
        ? "bg-gray-200 text-gray-900 border-b border-cyan-500"
        : "bg-gray-800 hover:bg-cyan-900 hover:text-gray-50"
    }`;

  return (
    <div className="flex justify-center gap-0 pt-4 pb-0 bg-gray-900 text-white">
      <Link href="/calculator/workout">
        <button className={getButtonClass("/calculator/workout")} >Workout</button>
      </Link>
      <Link href="/calculator/food">
        <button className={getButtonClass("/calculator/food")}>food</button>
      </Link>
    </div>
  );
};

export default TabSwitcher;
