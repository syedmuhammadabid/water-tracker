"use client";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";
import InstallButton from "./InstallButton";

export default function Home() {
  const [editId, setEditId] = useState<number | null>(null);
  const [editBottles, setEditBottles] = useState("");
  const [editDate, setEditDate] = useState("");
  const [records, setRecords] = useLocalStorage<any[]>("bottleRecords", []);
  const [bottles, setBottles] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const addRecord = () => {
    if (!bottles || parseInt(bottles) < 0) return;
    const newRecord = {
      id: Date.now(),
      bottles: parseInt(bottles),
      date: new Date(date).toISOString(),
    };
    setRecords([...records, newRecord]);
    setBottles("");
    setDate(new Date().toISOString().slice(0, 10));
  };

  const deleteRecord = (id: number) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const startEdit = (record: any) => {
    setEditId(record.id);
    setEditBottles(record.bottles.toString());
    setEditDate(record.date.slice(0, 10));
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditBottles("");
    setEditDate("");
  };

  const saveEdit = (id: number) => {
    if (!editBottles || parseInt(editBottles) < 0) return;
    setRecords(
      records.map((r) =>
        r.id === id
          ? { ...r, bottles: parseInt(editBottles), date: new Date(editDate).toISOString() }
          : r
      )
    );
    cancelEdit();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-6 max-w-md mx-auto shadow-lg rounded-lg">
      <InstallButton />
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">
        💧 Bottle Tracker
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-stretch sm:items-end">
        <div className="flex-1 flex flex-col">
          <label htmlFor="bottles" className="mb-1 text-sm text-gray-600">Bottles</label>
          <input
            id="bottles"
            type="number"
            value={bottles}
            onChange={(e) => setBottles(e.target.value)}
            placeholder="Enter bottles"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm w-full"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label htmlFor="date" className="mb-1 text-sm text-gray-600">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none shadow-sm w-full"
          />
        </div>
        <button
          onClick={addRecord}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transform hover:scale-105 transition-transform w-full sm:w-auto mt-2 sm:mt-0"
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
            {editId === r.id ? (
              <span className="flex-1 flex flex-col sm:flex-row gap-2 items-center">
                <input
                  type="number"
                  value={editBottles}
                  onChange={(e) => setEditBottles(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-20 text-center"
                  min="0"
                />
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-36 text-center"
                />
              </span>
            ) : (
              <span className="text-gray-800 flex-1">
                <strong className="text-blue-600">{r.bottles}</strong> bottles <br />
                <span className="text-sm text-gray-500">
                  {new Date(r.date).toLocaleString()}
                </span>
              </span>
            )}
            <div className="flex gap-2 items-center ml-2">
              {editId === r.id ? (
                <>
                  <button
                    onClick={() => saveEdit(r.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(r)}
                    className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-transform text-lg"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this record?")) {
                        deleteRecord(r.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-600 transform hover:scale-110 transition-transform text-lg"
                  >
                    ❌
                  </button>
                </>
              )}
            </div>
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
