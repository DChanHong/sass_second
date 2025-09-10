'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Link from 'next/link';
import { mbtiPackageSets, categoryInfo, CategoryKey } from '@/mockupData/coupang';

// 스와이퍼 무한 루프를 위해 패키지를 복제
const duplicatedPackages = [...mbtiPackageSets, ...mbtiPackageSets];

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
                <div className="overflow-x-hidden w-full max-w-screen">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={24}
                        breakpoints={{
                            0: {
                                slidesPerView: 1.5 // 0~639px
                            },
                            640: {
                                slidesPerView: 2.5 // 640px 이상
                            }
                        }}
                        loop={true}
                        autoplay={{ delay: 0, disableOnInteraction: false }}
                        speed={5000}
                        allowTouchMove={false}
                    >

                        {duplicatedPackages.map((pkg, index) => (
                            <SwiperSlide key={index}>
                                <div className={`
                                    group block rounded-2xl shadow-md hover:shadow-xl overflow-hidden
                                    transition-shadow duration-300 border border-gray-100 h-full
                                    bg-gradient-to-b ${pkg.gradient}
                                 `}>
                                    <div className="p-6">
                                        <div className="text-center mb-4">
                                            <span className="inline-block px-3 py-1 bg-white/80 rounded-full text-sm font-medium text-gray-700 mb-2">
                                                {pkg.mbti}
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                {pkg.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {pkg.description}
                                            </p>
                                        </div>

                                        {/* 3개 카테고리 그리드 */}
                                        <div className="grid grid-cols-3 gap-3 mb-6">
                                            {pkg.categories.map((categoryKey, i) => {
                                                const category = categoryInfo[categoryKey as CategoryKey];
                                                return (
                                                    <div key={i} className="text-center">
                                                        <div className="relative overflow-hidden rounded-lg mb-2 bg-white/50">
                                                            <img 
                                                                src={category.image}
                                                                alt={category.name}
                                                                className="w-full h-16 object-cover hover:scale-105 transition-transform duration-300"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.style.display = 'none';
                                                                    target.nextElementSibling?.classList.remove('hidden');
                                                                }}
                                                            />
                                                            {/* 이미지 로드 실패 시 표시될 아이콘 */}
                                                            <div className="hidden w-full h-16 flex items-center justify-center bg-gray-100 text-gray-400">
                                                                <span className="text-2xl">{category.emoji}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs font-medium text-gray-700">
                                                            {category.emoji} {category.name}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* 개별 링크들 */}
                                        <div className="space-y-2">
                                            {pkg.categories.map((categoryKey, i) => {
                                                const category = categoryInfo[categoryKey as CategoryKey];
                                                const link = pkg.links[categoryKey as CategoryKey];
                                                return (
                                                    <Link
                                                        key={i}
                                                        href={link}
                                                        target="_blank"
                                                        className="block w-full text-center bg-white/80 hover:bg-white 
                                                                 text-gray-700 hover:text-emerald-700 text-sm font-medium 
                                                                 py-2 rounded-lg transition-all duration-300 border border-white/50"
                                                    >
                                                        {category.emoji} {category.name} 보러가기
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
