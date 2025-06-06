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

    const handleSelect = (scene: { text: string; code?: string; isMbti?: boolean }) => {
        if (scene.isMbti) {
            router.push('/mbti/progress?step=mbti');
        } else if (scene.code) {
            router.push(`/mbti/progress?step=scene&scene=${scene.code}`);
        }
    };


    return (
        <section className={`${sectionClassName} w-full sm:w-[90%] md:w-[80%] lg:w-[1000px] mx-auto px-4`}>
            {/* 제목 */}
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-6 leading-snug text-center">
                    스타일을 추천받기 전에,
                    <br />
                    당신의 상황을 하나만 골라주세요!
                </h2>

                {/* 리스트 */}
                <div className="grid gap-4">
                    {mbtiSituationMockupData.map((s, idx) => (
                        <button
                            type={'button'}
                            key={idx}
                            onClick={() => handleSelect(s)}
                            className={`hover:cursor-pointer w-full flex justify-center items-center gap-4 px-6 py-4 rounded-xl font-medium shadow-sm transition-all hover:shadow-md
                                ${s.isMbti
                                ? 'bg-sky-100 hover:bg-sky-200 text-sky-800 border border-sky-200'
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
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