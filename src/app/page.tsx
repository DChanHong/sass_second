"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  const services = [
    {
      title: '사주팔자',
      description: '동양의 전통 운세를 확인해보세요',
      href: '/bazi',
      icon: '🎋',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: '서양 점성술',
      description: '별자리와 행성의 영향을 알아보세요',
      href: '/western-astrology',
      icon: '⭐',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: '인도 점성술',
      description: '베다 점성술로 운세를 확인하세요',
      href: '/vedic-astrology',
      icon: '🕉️',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: '타로 예측',
      description: '타로 카드로 미래를 탐색하세요',
      href: '/tarot',
      icon: '🎴',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Section 1: Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-b from-emerald-50 via-teal-50 to-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-emerald-900 mb-6">
                당신의 운세를<br />
                <span className="text-teal-600">한눈에</span>
              </h1>
              <p className="text-xl md:text-2xl text-emerald-700 mb-8 max-w-2xl mx-auto">
                다양한 운세 서비스로 당신의 운세를 확인해보세요.<br />
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

        {/* Section 2: Fortune Services */}
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

        {/* Section 3: Project Introduction */}
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
                우리의 프로젝트는 당신의 운세를 더욱 정확하고 쉽게 확인할 수 있게 해줍니다.
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
