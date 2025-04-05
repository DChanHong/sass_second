"use client";

import { motion } from "framer-motion";

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
    title: "정확한 계산",
    description: "과학적인 알고리즘으로 정확한 운세를 계산합니다.",
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
    description: "개인정보를 안전하게 보호합니다.",
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
    title: "쉬운 사용",
    description: "직관적인 인터페이스로 쉽게 운세를 확인할 수 있습니다.",
  },
];

export default function Section3() {
  return (
    <section className="py-20 bg-white">
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
            우리의 프로젝트는 당신의 운세를 더욱 정확하고 쉽게 확인할 수 있게
            해줍니다.
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
              className="bg-emerald-50/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm border border-emerald-100"
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
  );
}
