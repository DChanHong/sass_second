'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Section1() {
    return (
        <section
            className="relative min-h-[600px] h-[50vh] flex items-center justify-center bg-gradient-to-b from-emerald-50 via-teal-50 to-white overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="container mx-auto px-4 z-10 ">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* 사회적 증거 */}
                    <p className="text-sm text-emerald-600 font-medium mb-4">
                        🔥 24,832명이 참여한 인기 테스트
                    </p>


                    {/* 헤드라인 */}
                    <h1 className="text-4xl md:text-6xl font-bold text-emerald-900 mb-4">
                        나만의 자취 공간,
                        <br />
                        <span className="text-teal-600">MBTI로 시작하세요</span>
                    </h1>
                    {/* 서브라인 */}
                    <p className="text-lg md:text-xl text-emerald-700 mb-6 max-w-2xl mx-auto">
                        내 라이프스타일과 성격에
                        {/*<br className="block sm2:hidden" />*/}
                        꼭 맞는 가구를 추천해드려요.
                        {/*<br />*/}
                        공간 활용, 인테리어 취향, 실용성까지
                        {/*<br className={`block sm:hidden`} />*/}
                        모두 고려한 맞춤형 제안!
                    </p>

                    {/* 예시 강조 */}
                    <p className="text-sm text-gray-500 mb-6">
                        예: ENFP - 감성조명 / ISTJ - 수납선반
                    </p>

                    {/* CTA 버튼 */}
                    <Link
                        href="/mbti/start"
                        className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        3분 만에 자취스타일 알아보기 →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
