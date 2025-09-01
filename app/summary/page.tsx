"use client";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Summary() {
  const [records] = useLocalStorage<any[]>("bottleRecords", []);

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const totalToday = records
    .filter((r) => new Date(r.date).toDateString() === today.toDateString())
    .reduce((sum, r) => sum + r.bottles, 0);

  const totalWeek = records
    .filter((r) => new Date(r.date) >= startOfWeek)
    .reduce((sum, r) => sum + r.bottles, 0);

  const totalMonth = records
    .filter((r) => new Date(r.date) >= startOfMonth)
    .reduce((sum, r) => sum + r.bottles, 0);

  const monthWiseBreakdown: Record<string, number> = records.reduce((acc, record) => {
    const date = new Date(record.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2023-10"
    acc[monthKey] = (acc[monthKey] || 0) + record.bottles;
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-6 max-w-md mx-auto shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-green-700">
        📊 Bottle Summary
      </h1>

      <div className="space-y-6">
        <div className="p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <p className="text-lg text-blue-800 font-medium">Today</p>
          <p className="text-4xl font-extrabold text-blue-900">{totalToday}</p>
        </div>

        <div className="p-6 bg-green-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <p className="text-lg text-green-800 font-medium">This Week</p>
          <p className="text-4xl font-extrabold text-green-900">{totalWeek}</p>
        </div>

        <div className="p-6 bg-yellow-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <p className="text-lg text-yellow-800 font-medium">This Month</p>
          <p className="text-4xl font-extrabold text-yellow-900">{totalMonth}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Month-wise Breakdown
        </h2>
        <ul className="space-y-3">
          {Object.entries(monthWiseBreakdown).map(([month, total]) => (
            <li
              key={month}
              className="p-4 bg-gray-200 rounded-lg shadow-md flex justify-between hover:bg-gray-300 transition-colors"
            >
              <span className="text-gray-700 font-medium">{month}</span>
              <span className="font-bold text-gray-900">{total}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md font-medium transition-colors"
        >
          ← Back to Tracker
        </Link>
      </div>
    </main>
  );
}
