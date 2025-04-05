"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 via-teal-50 to-white pt-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl relative z-10 border border-emerald-100 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold text-emerald-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="text-gray-600 mb-8">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200 hover:cursor-pointer"
            >
              홈으로 돌아가기
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
