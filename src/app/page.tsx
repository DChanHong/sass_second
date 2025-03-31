"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Section 1: Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-b from-emerald-50 via-teal-50 to-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-emerald-900 mb-6">
                당신의 일상이<br />
                <span className="text-teal-600">새로워질 거예요</span>
              </h1>
              <p className="text-xl md:text-2xl text-emerald-700 mb-8 max-w-2xl mx-auto">
                이제껏 경험 못 했던 쉽고 편리한 서비스,<br />
                우리와 함께라면 당신의 일상이 더욱 스마트해질 거예요.
              </p>
              <Link
                href="/login"
                className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                사용해보기
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Project Introduction */}
        <section className="py-20 bg-emerald-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-emerald-900 mb-4">
                프로젝트 소개
              </h2>
              <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
                우리의 프로젝트는 당신의 일상을 더욱 편리하게 만들어줍니다.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm border border-emerald-100"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-emerald-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const features = [
  {
    icon: (
      <svg
        className="w-6 h-6 text-emerald-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "빠른 속도",
    description: "최적화된 성능으로 빠른 응답 속도를 제공합니다.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-emerald-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "안전한 보안",
    description: "최신 보안 기술로 데이터를 안전하게 보호합니다.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-emerald-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    ),
    title: "직관적인 UI",
    description: "사용하기 쉽고 이해하기 쉬운 인터페이스를 제공합니다.",
  },
];
