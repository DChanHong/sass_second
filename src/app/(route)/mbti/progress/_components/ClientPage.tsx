'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import { mbtiQuestionMockupData } from '@/mockupData';
import QuestionCard from '@/app/(route)/mbti/progress/_components/QuestionCard';
import { useRouter } from 'next/navigation';

const ClientPage = () => {
    const swiperRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    const handleSelect = (option: string, index: number) => {
        if (swiperRef.current && index < mbtiQuestionMockupData.length - 1) {
            swiperRef.current.slideNext();
        } else {
            alert('모든 질문이 완료되었습니다.');
        }
    };

    return (
        <div
            className="w-full max-w-[640px] h-[600px] relative flex items-center justify-center mt-[20px]">
            {/* 진행률 게이지 바 */}
            <div className="absolute -top-2 left-4 right-4 z-20">
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-visible">
                    {/* 채워진 진행 바 */}
                    <div
                        className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-300 rounded-full relative"
                        style={{
                            width: `${(currentIndex / (mbtiQuestionMockupData.length - 1)) * 100}%`
                        }}
                    >
                        {/* ⭐ 별을 바의 끝에 붙임 */}
                        <div className="absolute -top-2 right-0 translate-x-1/2 text-yellow-400 text-sm">
                            ⭐
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-1">
                    {currentIndex + 1} / {mbtiQuestionMockupData.length}
                </div>
            </div>

            {/* 중앙 Swiper */}
            <div className="relative z-10 w-full h-[500px]">
                <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    centeredSlides
                    mousewheel
                    modules={[Mousewheel]}
                    className="h-full"
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                >
                    {mbtiQuestionMockupData.map((q, idx) => (
                        <SwiperSlide
                            key={q.id}
                            className="!flex items-center justify-center"
                        >
                            <div className="w-full px-4 transition-all duration-300">
                                <QuestionCard
                                    current={idx + 1}
                                    total={mbtiQuestionMockupData.length}
                                    question={q.question}
                                    options={q.options}
                                    onSelect={(option) => handleSelect(option, idx)}
                                    isLast={idx === mbtiQuestionMockupData.length - 1} // ✅ 전달
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {currentIndex === mbtiQuestionMockupData.length - 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                        <button
                            className="cursor-pointer bg-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-300"
                            type={'button'}
                            onClick={() => {
                                router.push('/mbti/complete');
                            }}
                        >
                            결과 확인하기
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
};

export default ClientPage;
