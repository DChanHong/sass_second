"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Link from "next/link";

const mbtiPackages = [
    {
        mbti: "ENFP",
        title: "ENFP 감성템 패키지",
        items: ["🌕 무드등", "🧺 원목 수납함", "🪑 크림톤 접이식 의자"],
        image: "/main/section3/section1_mockup_1.png",
        link: "https://link.coupang.com/enfp-package"
    },
    {
        mbti: "ISTJ",
        title: "ISTJ 정리왕 패키지",
        items: ["📦 다용도 수납박스", "🗂️ 책상 정리함", "📚 슬림 책장"],
        image: "/main/section3/section1_mockup_2.png",
        link: "https://link.coupang.com/istj-package"
    },
    {
        mbti: "INFP",
        title: "INFP 감성충만 패키지",
        items: ["🕯️ 향초", "🛋️ 베이지 러그", "📖 원목 사이드테이블"],
        image: "/main/section3/section1_mockup_3.png",
        link: "https://link.coupang.com/infp-package"
    },
    {
        mbti: "ESTP",
        title: "ESTP 실용템 패키지",
        items: ["🧹 무선 청소기", "🪑 폴딩체어", "📦 스마트 정리함"],
        image: "/main/section3/section1_mockup_4.png",
        link: "https://link.coupang.com/estp-package"
    },
    {
        mbti: "ENFP",
        title: "ENFP 감성템 패키지",
        items: ["🌕 무드등", "🧺 원목 수납함", "🪑 크림톤 접이식 의자"],
        image: "/main/section3/section1_mockup_1.png",
        link: "https://link.coupang.com/enfp-package"
    },
    {
        mbti: "ISTJ",
        title: "ISTJ 정리왕 패키지",
        items: ["📦 다용도 수납박스", "🗂️ 책상 정리함", "📚 슬림 책장"],
        image: "/main/section3/section1_mockup_2.png",
        link: "https://link.coupang.com/istj-package"
    },
    {
        mbti: "INFP",
        title: "INFP 감성충만 패키지",
        items: ["🕯️ 향초", "🛋️ 베이지 러그", "📖 원목 사이드테이블"],
        image: "/main/section3/section1_mockup_3.png",
        link: "https://link.coupang.com/infp-package"
    },
    {
        mbti: "ESTP",
        title: "ESTP 실용템 패키지",
        items: ["🧹 무선 청소기", "🪑 폴딩체어", "📦 스마트 정리함"],
        image: "/main/section3/section1_mockup_4.png",
        link: "https://link.coupang.com/estp-package"
    }, {
        mbti: "ENFP",
        title: "ENFP 감성템 패키지",
        items: ["🌕 무드등", "🧺 원목 수납함", "🪑 크림톤 접이식 의자"],
        image: "/main/section3/section1_mockup_1.png",
        link: "https://link.coupang.com/enfp-package"
    },
    {
        mbti: "ISTJ",
        title: "ISTJ 정리왕 패키지",
        items: ["📦 다용도 수납박스", "🗂️ 책상 정리함", "📚 슬림 책장"],
        image: "/main/section3/section1_mockup_2.png",
        link: "https://link.coupang.com/istj-package"
    },
    {
        mbti: "INFP",
        title: "INFP 감성충만 패키지",
        items: ["🕯️ 향초", "🛋️ 베이지 러그", "📖 원목 사이드테이블"],
        image: "/main/section3/section1_mockup_3.png",
        link: "https://link.coupang.com/infp-package"
    },
    {
        mbti: "ESTP",
        title: "ESTP 실용템 패키지",
        items: ["🧹 무선 청소기", "🪑 폴딩체어", "📦 스마트 정리함"],
        image: "/main/section3/section1_mockup_4.png",
        link: "https://link.coupang.com/estp-package"
    }

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
                        내 성격에 딱 맞는 추천 아이템
                    </h2>
                    <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
                        이런 아이템, 당신의 자취 공간에 어때요?
                    </p>
                </motion.div>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    slidesPerView={2.5}
                    loop={true}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                    speed={5000}
                    allowTouchMove={false}
                >

                    {mbtiPackages.map((pkg, index) => (
                        <SwiperSlide key={index}>
                            <Link
                                href={pkg.link}
                                target="_blank"
                                className={`
                                    group block rounded-2xl shadow-md hover:shadow-xl overflow-hidden
                                    transition-shadow duration-300 border border-gray-100 h-full
                                    bg-gradient-to-b from-emerald-50 to-white
                                 `}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.title}
                                        className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />
                                </div>

                                <div className="p-5 flex flex-col flex-grow transition-colors duration-300">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                                        {pkg.title}
                                    </h3>
                                    <ul className="text-sm text-gray-600 mb-4 space-y-1 leading-relaxed">
                                        {pkg.items.map((item, i) => (
                                            <li key={i}>• {item}</li>
                                        ))}
                                    </ul>

                                    <div
                                        className="mt-auto inline-block w-full text-center bg-emerald-600 group-hover:bg-emerald-700
                   text-white text-sm font-medium py-2 rounded-lg transition-colors duration-300"
                                    >
                                        자세히 보기 →
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
