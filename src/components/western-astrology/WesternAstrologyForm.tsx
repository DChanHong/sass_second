"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface WesternAstrologyFormData {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
  house_type: string;
}

interface WesternAstrologyFormProps {
  onSubmit: (data: WesternAstrologyFormData) => void;
  loading?: boolean;
}

export default function WesternAstrologyForm({
  onSubmit,
  loading = false,
}: WesternAstrologyFormProps) {
  const [formData, setFormData] = useState<WesternAstrologyFormData>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    hour: 12,
    min: 0,
    lat: 37.5665, // 서울 기본값
    lon: 126.978, // 서울 기본값
    tzone: 9.0, // 한국 시간대 기본값
    house_type: "placidus",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "house_type" ? value : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">
        서양 점성술 휠차트
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 생년월일 입력 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              생년월일
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max="2100"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="년"
                required
              />
              <input
                type="number"
                name="month"
                value={formData.month}
                onChange={handleChange}
                min="1"
                max="12"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="월"
                required
              />
              <input
                type="number"
                name="day"
                value={formData.day}
                onChange={handleChange}
                min="1"
                max="31"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="일"
                required
              />
            </div>
          </div>

          {/* 생시 입력 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              생시
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="hour"
                value={formData.hour}
                onChange={handleChange}
                min="0"
                max="23"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="시"
                required
              />
              <input
                type="number"
                name="min"
                value={formData.min}
                onChange={handleChange}
                min="0"
                max="59"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="분"
                required
              />
            </div>
          </div>

          {/* 하우스 시스템 선택 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              하우스 시스템
            </label>
            <select
              name="house_type"
              value={formData.house_type}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="placidus">Placidus</option>
              <option value="koch">Koch</option>
              <option value="porphyrius">Porphyrius</option>
              <option value="regiomontanus">Regiomontanus</option>
              <option value="campanus">Campanus</option>
              <option value="equal">Equal</option>
              <option value="whole_sign">Whole Sign</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 위도 입력 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              위도
            </label>
            <input
              type="number"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              step="0.0001"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="위도 (예: 37.5665)"
              required
            />
          </div>

          {/* 경도 입력 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              경도
            </label>
            <input
              type="number"
              name="lon"
              value={formData.lon}
              onChange={handleChange}
              step="0.0001"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="경도 (예: 126.9780)"
              required
            />
          </div>

          {/* 시간대 입력 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              시간대
            </label>
            <input
              type="number"
              name="tzone"
              value={formData.tzone}
              onChange={handleChange}
              step="0.5"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="시간대 (예: 9.0)"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "처리 중..." : "휠차트 생성"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
