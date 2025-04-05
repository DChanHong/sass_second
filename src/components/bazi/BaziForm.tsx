"use client";

import { useState } from "react";
import { BaziInput } from "@/lib/bazi/types";

interface BaziFormProps {
  onSubmit: (data: BaziInput) => Promise<void>;
  loading: boolean;
}

export default function BaziForm({ onSubmit, loading }: BaziFormProps) {
  const [formData, setFormData] = useState<BaziInput>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    gender: "male",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gender" ? value : Number(value),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            년도
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            월
          </label>
          <input
            type="number"
            id="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            min="1"
            max="12"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="day"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            일
          </label>
          <input
            type="number"
            id="day"
            name="day"
            value={formData.day}
            onChange={handleChange}
            min="1"
            max="31"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="hour"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            시간
          </label>
          <input
            type="number"
            id="hour"
            name="hour"
            value={formData.hour}
            onChange={handleChange}
            min="0"
            max="23"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="minute"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            분
          </label>
          <input
            type="number"
            id="minute"
            name="minute"
            value={formData.minute}
            onChange={handleChange}
            min="0"
            max="59"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            성별
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 outline-none"
            required
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:cursor-pointer"
      >
        {loading ? "계산중..." : "사주팔자 보기"}
      </button>
    </form>
  );
}
