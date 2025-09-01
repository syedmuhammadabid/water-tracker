"use client";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";
import InstallButton from "./InstallButton";

export default function Home() {
  const [records, setRecords] = useLocalStorage<any[]>("bottleRecords", []);
  const [bottles, setBottles] = useState("");

  const addRecord = () => {
    if (!bottles || parseInt(bottles) < 0) return;
    const newRecord = {
      id: Date.now(),
      bottles: parseInt(bottles),
      date: new Date().toISOString(),
    };
    setRecords([...records, newRecord]);
    setBottles("");
  };

  const deleteRecord = (id: number) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-6 max-w-md mx-auto shadow-lg rounded-lg">
      <InstallButton />
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">
        💧 Bottle Tracker
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          type="number"
          value={bottles}
          onChange={(e) => setBottles(e.target.value)}
          placeholder="Enter bottles"
          className="border border-gray-300 rounded-lg p-3 flex-1 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
        />
        <button
          onClick={addRecord}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transform hover:scale-105 transition-transform"
        >
          ➕ Add
        </button>
      </div>

      <ul className="space-y-4">
        {records.map((r) => (
          <li
            key={r.id}
            className="flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-3 hover:shadow-lg transition-shadow"
          >
            <span className="text-gray-800">
              <strong className="text-blue-600">{r.bottles}</strong> bottles <br />
              <span className="text-sm text-gray-500">
                {new Date(r.date).toLocaleString()}
              </span>
            </span>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this record?")) {
                  deleteRecord(r.id);
                }
              }}
              className="text-red-500 hover:text-red-600 transform hover:scale-110 transition-transform"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Link
          href="/summary"
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transform hover:scale-105 transition-transform"
        >
          📊 View Summary
        </Link>
      </div>
    </main>
  );
}
