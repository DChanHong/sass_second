'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import { mbtiQuestionMockupData } from '@/mockupData';
import QuestionCard from '@/app/(route)/mbti/progress/_components/QuestionCard';


const ClientPage = () => {
    const swiperRef = useRef<any>(null);

    const handleSelect = (option: string, index: number) => {
        console.log(`Q${index + 1} 선택된 답변:`, option);

        // 다음 슬라이드로 이동 (마지막이 아닐 경우)
        if (swiperRef.current && index < mbtiQuestionMockupData.length - 1) {
            swiperRef.current.slideNext();
        } else {
            alert('모든 질문이 완료되었습니다.');
            // router.push('/mbti/result') 등으로 이동 가능
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-white overflow-hidden"> {/* ⬅ 여기 추가 */}
            <div className="w-full max-w-[640px] h-[500px] overflow-hidden"> {/* ⬅ 여기도 */}
                <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    mousewheel
                    modules={[Mousewheel]}
                    className="h-full"
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {mbtiQuestionMockupData.map((q, idx) => (
                        <SwiperSlide key={q.id} className="flex items-center justify-center !h-full">
                            <div className="w-full px-4 max-h-full overflow-y-auto">
                                <QuestionCard
                                    current={idx + 1}
                                    total={mbtiQuestionMockupData.length}
                                    question={q.question}
                                    options={q.options}
                                    onSelect={(option) => handleSelect(option, idx)}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ClientPage;
