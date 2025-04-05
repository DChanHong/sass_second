"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Section1() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-emerald-50 via-teal-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-emerald-900 mb-6">
            당신의 운세를
            <br />
            <span className="text-teal-600">한눈에</span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-700 mb-8 max-w-2xl mx-auto">
            다양한 운세 서비스로 당신의 운세를 확인해보세요.
            <br />
            동양과 서양의 지혜가 만나 새로운 인사이트를 제공합니다.
          </p>
          <Link
            href="/services"
            className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            시작하기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
