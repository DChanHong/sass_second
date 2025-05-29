'use client';

import React from 'react';

interface QuestionCardProps {
    current: number;
    total: number;
    question: string;
    options: string[];
    onSelect: (option: string) => void;
    isLast?: boolean; // ✅ 추가

}

export default function QuestionCard({ current, total, question, options, onSelect, isLast }: QuestionCardProps) {
    return (
        <section className="w-full h-full flex flex-col justify-between">
            {/* 상단 진행도 */}
            {!isLast && <div className="flex justify-between items-center mb-4">
                <span className="text-emerald-600 font-medium text-sm">[ {current} / {total} ]</span>
                <span className="text-gray-400 text-sm">아래로 스와이프 또는 ▼</span>
            </div>}

            {/* 질문 */}
            <div className="text-center my-8">
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">{question}</h2>
            </div>

            {/* 답변 선택지 */}
            <div className="flex flex-col gap-4">
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(option)}
                        className="w-full px-6 py-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium shadow-sm hover:shadow-md transition-all"
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* 아래 스와이프 안내 */}
            {!isLast && (
                <div className="mt-auto text-center text-gray-400 text-sm pt-10">
                    ▼ 아래로 넘겨 다음 질문
                </div>
            )}
        </section>
    );
}
