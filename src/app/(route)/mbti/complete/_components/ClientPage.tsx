'use client';

import React from 'react';

const ClientPage = () => {
    const mbtiType = 'INTJ';
    const mbtiTitle = '감성 설계자';
    const summary = '논리적이면서도 창의적인 전략가 유형입니다.';
    const keywords = ['#독립적', '#계획형', '#몰입형'];

    const analysis = [
        '혼자만의 시간에서 힘을 얻는 경향이 강해요.',
        '계획형 답변이 많아 INTJ의 전형적인 모습입니다.'
    ];

    const recommendedItems = [
        {
            name: '심플 모던 책상',
            description: '혼자만의 집중 공간에 적합한 데스크',
            image: '/main/section3/section1_mockup_4.png',
            link: 'https://www.coupang.com/vp/products/0001?affiliate=xyz'
        },
        {
            name: '무소음 LED 조명',
            description: '조용한 공간에 어울리는 은은한 조명',
            image: '/main/section3/section1_mockup_3.png',
            link: 'https://www.coupang.com/vp/products/0002?affiliate=xyz'
        },
        {
            name: '인체공학 의자',
            description: '장시간 앉아도 편안한 몰입형 의자',
            image: '/main/section3/section1_mockup_2.png',
            link: 'https://www.coupang.com/vp/products/0003?affiliate=xyz'
        }
    ];

    return (
        <section className="max-w-[1000px] mx-auto px-4 py-16 text-emerald-900">
            {/* 1. 헤더 */}
            <header className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    당신의 MBTI는 <span className="text-indigo-600">{mbtiType}</span>
                </h2>
                <p className="text-xl font-semibold">{mbtiTitle}</p>
            </header>

            {/* 2. 요약 카드 */}
            <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm mb-10">
                <p className="text-lg mb-3">{summary}</p>
                <div className="flex gap-2 flex-wrap">
                    {keywords.map((k, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-emerald-100 text-sm font-medium"
                        >
              {k}
            </span>
                    ))}
                </div>
            </section>

            {/* 3. 선택 기반 해석 */}
            <section className="mb-10">
                <h3 className="text-2xl font-bold mb-4">🧩 나의 선택 분석</h3>
                <ul className="space-y-2">
                    {analysis.map((line, idx) => (
                        <li key={idx} className="bg-white border-l-4 border-indigo-500 p-4 rounded-md shadow-sm">
                            {line}
                        </li>
                    ))}
                </ul>
            </section>

            {/* 4. 추천 콘텐츠 */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold mb-3">✨ 이런 공간이 잘 어울려요</h3>
                <p className="mb-5">
                    혼자 있는 걸 즐기고, 조용한 환경에서 몰입하는 당신에게는 심플한 데스크 셋업이 찰떡이에요!
                </p>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {recommendedItems.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.link}
                            className="group block bg-white border border-emerald-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {/* 이미지 */}
                            <div className="w-full aspect-[4/3] bg-emerald-50">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* 텍스트 */}
                            <div className="p-4">
                                <p className="font-bold text-emerald-800 mb-1">{item.name}</p>
                                <p className="text-sm text-emerald-700">{item.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* 5. 하단 CTA */}
            <footer className="mt-14 grid gap-4">
                {/* 주 CTA: 결과 저장 / 공유 */}
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

                {/* 보조 CTA: 다시하기 */}
                <div className="text-center">
                    <button className="text-emerald-700 underline hover:text-emerald-900 text-sm mt-2">
                        다시 하기 ↺
                    </button>
                </div>
            </footer>
        </section>
    );
};

export default ClientPage;
