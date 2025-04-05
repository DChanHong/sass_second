"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "사주팔자",
    description: "동양의 전통 운세를 확인해보세요",
    href: "/bazi",
    icon: "🎋",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "서양 점성술",
    description: "별자리와 행성의 영향을 알아보세요",
    href: "/western-astrology",
    icon: "⭐",
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "인도 점성술",
    description: "베다 점성술로 운세를 확인하세요",
    href: "/vedic-astrology",
    icon: "🕉️",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "타로 예측",
    description: "타로 카드로 미래를 탐색하세요",
    href: "/tarot",
    icon: "🎴",
    color: "from-pink-500 to-rose-500",
  },
];

export default function Section2() {
  return (
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
            운세 서비스
          </h2>
          <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
            다양한 운세 서비스로 당신의 운세를 확인해보세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={service.href}
                className="block p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{service.description}</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-emerald-500 transition-colors duration-200">
                    →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
