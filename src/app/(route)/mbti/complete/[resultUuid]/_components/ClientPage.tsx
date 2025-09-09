'use client';

import React, { useEffect, useState } from 'react';
import { moodDeaungList, deskList,vacuumList } from '@/mockupData/coupang';
import Image from 'next/image';
import { useWindowSize } from '@/lib/hooks/useWindowSize';
import Link from 'next/link';
import { useMbtiResult } from '@/actions/mbtiResult';
import { MbtiResult } from '@/types/mbtLiving';
import { useToast } from '@/contexts/ToastContext';

import Loader from '@/components/common/Loader/Loader';
import MbtiError from './MbtiError';

const ClientPage = ({ resultUuid }: { resultUuid: string }) => {
    const { data: resultData, status: resultDataStatus } = useMbtiResult(resultUuid);
    const { showToast } = useToast();
    const totlaCoupangItems = [...moodDeaungList, ...deskList, ...vacuumList];

    const { width, height } = useWindowSize();
    const [isMounted, setIsMounted] = useState(false);
    const [randomItems, setRandomItems] = useState<{
        coupangItems: any[];
        moodItems: any[];
    }>({ coupangItems: [], moodItems: [] });

    // API 데이터가 로드되면 사용, 아니면 기본값
    const mbtiType = resultData?.data?.mbti?.name || '';
    const mbtiTitle = resultData?.data?.mbti?.title || '';

    // 중복 없는 랜덤 아이템 선택 함수
    const getRandomItemsWithoutDuplication = (allItems: any[], topCount: number, bottomCount: number) => {
        const shuffled = [...allItems].sort(() => 0.5 - Math.random());
        const coupangItems = shuffled.slice(0, topCount);
        const remainingItems = shuffled.slice(topCount);
        const moodItems = remainingItems.slice(0, bottomCount);
        
        return { coupangItems, moodItems };
    };

    // Hydration 에러 방지를 위해 클라이언트에서만 렌더링 + 랜덤 아이템 한 번만 설정
    useEffect(() => {
        setIsMounted(true);
        
        // 화면 크기에 관계없이 최대 개수로 미리 선택
        const maxTopItems = 4; // 위쪽 섹션 최대
        const maxBottomItems = 3; // 아래쪽 섹션 최대
        
        const randomSelection = getRandomItemsWithoutDuplication(
            totlaCoupangItems, 
            maxTopItems, 
            maxBottomItems
        );
        
        setRandomItems(randomSelection);
    }, []); // 빈 배열로 한 번만 실행

    const isMobile = width < 765;
    const visibleItems = isMobile ? 3 : 4;

    // 화면 크기에 따라 표시할 아이템 수만 조정 (랜덤은 다시 하지 않음)
    const displayCoupangItems = randomItems.coupangItems.slice(0, visibleItems);
    const displayMoodItems = randomItems.moodItems;

    

    // 로딩 중이거나 아직 마운트되지 않았을 때
    if (resultDataStatus === 'pending' || !isMounted) {
        return <Loader />;
    }

    // 에러가 발생했을 때
    if (resultDataStatus === 'error') {
        return (
            <MbtiError />
        );
    }



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
                        <h3 className="text-xl font-semibold mb-4">🧩 나의 선택</h3>
                        <ul className="space-y-2">
                            {resultData?.data?.preferenceSummary?.map((text, idx) => (
                                <li
                                    key={idx}
                                    className="bg-white border-l-4 border-indigo-500 p-4 rounded-md shadow-sm"
                                >
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl">🎯</span>
                            <h3 className="text-xl font-semibold">당신의 선택 요약</h3>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 shadow-sm text-emerald-800 break-words">
                            {resultData?.data?.mbtiAnalysisSummary || ''}
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-bold mb-4">🛋️ 당신에게 어울리는 공간 아이템</h3>
                    <div className="grid gap-2 sm:gap-4 grid-cols-3 md:grid-cols-4">
                        {displayCoupangItems.map((item, idx) => (
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
                    <h3 className="text-2xl font-bold mb-4">🧠 {resultData?.data?.mbti?.name || ''} 성향 분석</h3>
                    <p className="whitespace-pre-wrap bg-emerald-50 p-4 rounded-lg border border-emerald-200 shadow-sm text-emerald-800">
                        {resultData?.data?.mbtiAnalysisSummary || ''}
                    </p>
                </section>

                <section>
                    <h3 className="text-2xl font-bold mb-3">🛋️ 당신에게 어울리는 공간 아이템</h3>
                    <p className="mb-5">
                        조용하고 감성적인 공간을 좋아하는 INTJ 성향을 고려해 이런 아이템들을 추천드려요.
                    </p>
                    <div className="grid gap-2 sm:g-4 grid-cols-3 md:grid-cols-3">
                        {displayMoodItems.map((item, idx) => (
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
                            onClick={async () => {
                                // 복사할 텍스트 생성
                                const copyText = `🧠 나의 MBTI 결과: ${mbtiType} ${mbtiTitle}

                                    📝 성향 분석:
                                    ${resultData?.data?.mbtiAnalysisSummary || ''}

                                    🎯 선택 요약:
                                    ${resultData?.data?.preferenceSummary?.map((summary, idx) => `${idx + 1}. ${summary}`).join('\n') || ''}

                                    🔗 테스트 해보기: ${window.location.origin}/mbti/start
                                    📊 내 결과 보기: ${window.location.href}`;

                                try {
                                    await navigator.clipboard.writeText(copyText);
                                    showToast('success', '결과가 클립보드에 복사되었습니다!\n카카오톡이나 메모장에 붙여넣기 해보세요.', 4000);
                                } catch (error) {
                                    // 클립보드 API 실패 시 폴백
                                    try {
                                        const textarea = document.createElement('textarea');
                                        textarea.value = copyText;
                                        document.body.appendChild(textarea);
                                        textarea.select();
                                        document.execCommand('copy');
                                        document.body.removeChild(textarea);
                                        showToast('success', '결과가 복사되었습니다!');
                                    } catch (fallbackError) {
                                        showToast('error', '복사에 실패했습니다. 브라우저를 업데이트해주세요.');
                                    }
                                }
                            }}
                            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-4 rounded-xl shadow-md transition hover:cursor-pointer">
                            📥 결과 복사하기
                        </button>
                        {/* <button
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-4 rounded-xl shadow-md transition">
                            🤝 친구에게 공유하기
                        </button> */}
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


