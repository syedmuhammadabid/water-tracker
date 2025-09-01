"use client";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const [records, setRecords] = useLocalStorage<any[]>("bottleRecords", []);
  const [bottles, setBottles] = useState("");

  const addRecord = () => {
    if (!bottles) return;
    const newRecord = {
      id: Date.now(),
      bottles: parseInt(bottles),
      date: new Date().toLocaleString(),
    };
    setRecords([...records, newRecord]);
    setBottles("");
  };

  const deleteRecord = (id: number) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">💧 Water Bottle Tracker</h1>
      
      <div className="flex gap-2">
        <input
          type="number"
          value={bottles}
          onChange={(e) => setBottles(e.target.value)}
          placeholder="Enter bottles"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={addRecord}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ➕
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {records.map((r) => (
          <li key={r.id} className="flex justify-between border-b py-2">
            <span>{r.bottles} bottles on {r.date}</span>
            <button
              onClick={() => deleteRecord(r.id)}
              className="text-red-500"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}