'use client';

import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mbtiSceneQuestionMap, mbtiSituationMockupData } from '@/mockupData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import QuestionCard from '@/app/(route)/mbti/progress/_components/QuestionCard';
import { Question } from '@/app/(route)/mbti/progress/_type';
import { MBTIResponse } from '@/types/mbti';

/**
 * MBTI 상황으로 테스트 바로 진행
 */

interface IProps {
    step: string;
    scene: string;
    mbtiList: MBTIResponse[];
    completeTest: (data: any) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const DirectItem = ({ step, scene, mbtiList, completeTest }: IProps) => {
    const sceneObj = mbtiSituationMockupData.find((fi) => fi.code === scene);
    const [selectedMbti, setSelectedMbti] = useState<{ code: string, name: string } | null>(null);
    const swiperRef = useRef<any>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    const [questions, setQuestions] = useState<Question[]>(() =>
        (mbtiSceneQuestionMap[scene] ?? []).map((q) => ({
            ...q,
            checked: ''
        }))
    );

    // 최신 questions 상태를 참조하기 위한 ref
    const questionsRef = useRef(questions);
    questionsRef.current = questions;

    const handleSelect = useCallback(
        (option: string, index: number) => {
            setQuestions((prev) =>
                prev.map((q, i) => (i === index ? { ...q, checked: option } : q))
            );

            if (swiperRef.current && index < questions.length - 1) {
                swiperRef.current.slideNext();
            }
        },
        [questions.length]
    );

    const mbtiSelect = useCallback((code: string, name: string) => {
        setSelectedMbti({ code: code, name: name });
    }, []);

    useEffect(() => {
        return () => {
            // 언마운트 시 휠 이벤트 제거
            if (swiperRef.current?._wheelCleanup) {
                swiperRef.current._wheelCleanup();
            }
        };
    }, []);

    return (
        <>

            {!selectedMbti ? (
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        당신의 MBTI를 선택해주세요
                    </h2>
                    <div className="grid grid-cols-4 gap-3">
                        {mbtiList.map(({ name, code, bgColor, textColor, title }) => (
                            <button
                                key={name}
                                title={title}
                                className={`h-[60px] hover:cursor-pointer flex items-center justify-center text-sm sm:text-base font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-200`}
                                style={{ backgroundColor: bgColor, color: textColor }}
                                onClick={() => mbtiSelect(code, name)}
                            >
                                {name}
                            </button>
                        ))}

                    </div>
                </div>
            ) : (
                <div className="relative mt-8">
                    {/* 진행률 바 */}
                    <div className="absolute -top-8 left-0 right-0">
                        <div className="h-2 bg-gray-200 rounded-full relative overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-300"
                                style={{
                                    width: `${(currentIndex / (questions.length - 1)) * 100}%`
                                }}
                            />
                        </div>
                        <div className="text-center text-sm text-gray-500 mt-1">
                            {currentIndex + 1} / {questions.length}
                        </div>
                    </div>

                    {/* 질문 카드 */}
                    <Swiper
                        direction="vertical"
                        slidesPerView={1}
                        centeredSlides
                        modules={[Mousewheel]}
                        mousewheel={false} // 기본 mousewheel 기능 비활성화
                        allowTouchMove={false} // 터치/드래그로 슬라이드 방지
                        className="h-[500px]"
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;

                            // 휠 이벤트 핸들러
                            const handleWheel = (e: WheelEvent) => {
                                e.preventDefault();
                                e.stopPropagation();

                                // 스와이퍼가 애니메이션 중이면 무시
                                if (swiper.animating) return;

                                const delta = e.deltaY;
                                const direction = delta > 0 ? 'down' : 'up';
                                const currentSlideIndex = swiper.activeIndex;
                                const isLastSlide = currentSlideIndex === questionsRef.current.length - 1;
                                const isFirstSlide = currentSlideIndex === 0;

                                // 최신 상태에서 현재 질문 정보 가져오기
                                const currentQuestion = questionsRef.current[currentSlideIndex];
                                const isCurrentAnswered = currentQuestion?.checked && currentQuestion.checked.trim() !== '';

                                console.log('Wheel event:', {
                                    direction,
                                    currentSlideIndex,
                                    isLastSlide,
                                    isFirstSlide,
                                    isCurrentAnswered,
                                    currentChecked: currentQuestion?.checked
                                });

                                // 마지막 질문인 경우 - 위로만 가능
                                if (isLastSlide) {
                                    if (direction === 'up' && !isFirstSlide) {
                                        swiper.slidePrev();
                                    }
                                    return;
                                }

                                // 다른 질문들인 경우
                                if (direction === 'down') {
                                    // 아래로 스크롤 - 현재 질문이 체크되어야만 가능
                                    if (isCurrentAnswered) {
                                        swiper.slideNext();
                                    }
                                } else if (direction === 'up') {
                                    // 위로 스크롤 - 항상 가능 (첫 번째가 아닌 경우)
                                    if (!isFirstSlide) {
                                        swiper.slidePrev();
                                    }
                                }
                            };

                            // 이벤트 리스너 등록
                            const swiperContainer = swiper.el;
                            swiperContainer.addEventListener('wheel', handleWheel, {
                                passive: false
                            });

                            // 클린업 함수 저장
                            swiperRef.current._wheelCleanup = () => {
                                swiperContainer.removeEventListener('wheel', handleWheel);
                            };
                        }}
                        onSlideChange={(swiper) => {
                            setCurrentIndex(swiper.activeIndex);
                        }}
                    >
                        {questions.map((q, idx) => (
                            <SwiperSlide
                                key={q.id}
                                className="!flex items-center justify-center"
                            >
                                <div className="w-full px-4">
                                    <QuestionCard
                                        current={idx + 1}
                                        total={questions.length}
                                        question={q.question}
                                        options={q.options}
                                        onSelect={(option) => handleSelect(option, idx)}
                                        isLast={idx === questions.length - 1}
                                        selectedOption={q.checked}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* 완료 버튼 */}
                    {currentIndex === questions.length - 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                            <button
                                type="button"
                                className="bg-indigo-500 hover:cursor-pointer text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-600"
                                onClick={async () => {
                                    await completeTest({
                                        mbti: selectedMbti,
                                        answers: questions,
                                        scene: sceneObj
                                    });
                                }}
                            >
                                결과 확인하기
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default DirectItem;


