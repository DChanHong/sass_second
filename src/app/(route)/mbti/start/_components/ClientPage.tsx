'use client';
import React from 'react';
import { mbtiSituationMockupData } from '@/mockupData';
import { useRouter } from 'next/navigation';


const ClientPage = ({ layoutOption }: {
    layoutOption?: {
        className?: string,
    }
}) => {
    const sectionClassName = layoutOption?.className ?? 'my-[100px] min-h-[50vh]';

    const router = useRouter();

    const handleSelect = (situation: string) => {
        // 선택값 저장 없이 검사 시작 페이지로 이동
        router.push('/mbti/start');
    };
    return (
        <section className={`${sectionClassName} w-full`}>
            <div
                className="w-full sm:w-[90%] md:w-[80%] lg:w-[1000px] mx-auto px-4"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-8 leading-snug">
                    스타일을 추천받기 전에,
                    <br />
                    당신의 상황을 하나만 골라주세요!
                </h2>

                <div className="grid gap-4">
                    {mbtiSituationMockupData.map((s, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSelect(s.text)}
                            className="w-full flex items-center hover:cursor-pointer gap-4 px-6 py-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium shadow-sm hover:shadow-md transition-all"
                        >
                            <span className="text-2xl">{s.icon}</span>
                            <span className="text-left">{s.text}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientPage;