'use client';

import React, { useEffect, useState } from 'react';
import { moodDeaungList } from '@/mockupData/coupang';
import Image from 'next/image';
import { useWindowSize } from '@/hooks/useWindowSize';
import Link from 'next/link';

const AnimatedCount = ({ target, trigger }: { target: number; trigger: boolean }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!trigger) return;
        let start = 0;
        const duration = 1000;
        const stepTime = 20;
        const totalSteps = Math.ceil(duration / stepTime);
        const increment = target / totalSteps;

        const interval = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(Math.round(start));
            }
        }, stepTime);

        return () => clearInterval(interval);
    }, [trigger, target]);

    return <span>{count}%</span>;
};

const ClientPage = () => {
    const { width, height } = useWindowSize();
    const mbtiType = 'INTJ';
    const mbtiTitle = '감성 설계자';

    const isMobile = width < 765;
    const visibleItems = isMobile ? 3 : 4;

    const mbtiDescription = `INTJ는 뛰어난 전략적 사고와 독립성을 갖춘 인물로, 복잡한 문제 해결에 강한 흥미를 느낍니다.감정보다 논리를 우선시하지만, 자신만의 내면 세계에선 매우 섬세하고 창의적인 아이디어를 품고 있죠.혼자 있는 시간이 필요하며, 몰입 가능한 환경을 중요하게 여깁니다.`;

    const data = [
        { label: '공간 선호도', percent: 90 },
        { label: '색상 선호도', percent: 75 },
        { label: '조명 선호도', percent: 80 },
        { label: '수납 성향', percent: 92 }
    ];

    const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);

    useEffect(() => {
        const timeouts = data.map((item, idx) =>
            setTimeout(() => {
                setProgress(prev => {
                    const copy = [...prev];
                    copy[idx] = item.percent;
                    return copy;
                });
            }, idx * 200)
        );

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-16 text-emerald-900">
            <header className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    당신의 MBTI는 <span className="text-indigo-600">{mbtiType}</span>
                </h2>
                <p className="text-xl font-semibold">{mbtiTitle}</p>
            </header>
            <div className={`flex flex-col gap-[40px]`}>
                <section className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">🧩 나의 선택 분석</h3>
                        <ul className="space-y-2">
                            {[
                                '혼자 있는 조용한 공간을 선택했어요.',
                                '색상은 무채색 / 그레이 계열을 선호해요.',
                                '조명은 은은한 간접조명을 선택했어요.',
                                '수납은 정리정돈이 잘 되는 가구를 선호해요.'
                            ].map((text, idx) => (
                                <li key={idx}
                                    className="bg-white border-l-4 border-indigo-500 p-4 rounded-md shadow-sm">
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">📊 INTJ 평균 선호도</h3>
                        <ul className="space-y-3">
                            {data.map((item, idx) => (
                                <li key={idx}>
                                    <div className="flex justify-between text-sm font-medium mb-1">
                                        <span>{item.label}</span>
                                        <AnimatedCount target={item.percent} trigger={progress[idx] > 0} />
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${progress[idx]}%` }}
                                        ></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-bold mb-3">🛋️ 당신에게 어울리는 공간 아이템</h3>
                    <p className="mb-5">
                        조용하고 감성적인 공간을 좋아하는 INTJ 성향을 고려해 이런 아이템들을 추천드려요.
                    </p>

                    <div className="grid gap-2 sm:gap-4 grid-cols-3 md:grid-cols-4">
                        {moodDeaungList.slice(0, visibleItems).map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                className="group block max-w-[160px] mx-auto bg-white border border-emerald-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="w-full aspect-[1/2] bg-emerald-50 relative">
                                    <Image
                                        src={item.imgPath}
                                        alt={item.alt}
                                        fill
                                        sizes="160px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-2">
                                    <p className="font-semibold text-emerald-800 text-xs leading-snug line-clamp-2">
                                        {item.alt}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>


                <section className="">
                    <h3 className="text-2xl font-bold mb-4">🧠 INTJ 성향 분석</h3>
                    <p className="whitespace-pre-wrap bg-emerald-50 p-4 rounded-lg border border-emerald-200 shadow-sm text-emerald-800">
                        {mbtiDescription}
                    </p>
                </section>

                <section>
                    <h3 className="text-2xl font-bold mb-3">🛋️ 당신에게 어울리는 공간 아이템</h3>
                    <p className="mb-5">
                        조용하고 감성적인 공간을 좋아하는 INTJ 성향을 고려해 이런 아이템들을 추천드려요.
                    </p>
                    <div className="grid gap-2 sm:g-4 grid-cols-3 md:grid-cols-3">
                        {moodDeaungList.slice(2, 5).map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                className="group block max-w-[160px] mx-auto bg-white border border-emerald-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="w-full aspect-[1/2] bg-emerald-50 relative">
                                    <Image
                                        src={item.imgPath}
                                        alt={item.alt}
                                        fill
                                        sizes="160px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-2">
                                    <p className="font-semibold text-emerald-800 text-xs leading-snug line-clamp-2">{item.alt}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>


                <footer className="mt-14 grid gap-4">
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-4 rounded-xl shadow-md transition">
                            📥 결과 저장하기
                        </button>
                        <button
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-4 rounded-xl shadow-md transition">
                            🤝 친구에게 공유하기
                        </button>
                    </div>
                    <div className="text-center">
                        <Link
                            href={'/mbti/start'}
                            className="text-emerald-700 underline hover:text-emerald-900 text-sm mt-2">
                            다시 하기 ↺
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ClientPage;
