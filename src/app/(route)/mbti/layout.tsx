// app/(route)/mbti/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MBTI 자취 테스트 - 시작하기',
    description: '나에게 딱 맞는 자취 공간을 MBTI 기반으로 추천해드립니다.',
    keywords: ['MBTI', '자취', '공간 추천', '테스트'],
    openGraph: {
        title: 'MBTI 자취 테스트',
        description: 'MBTI 기반 자취 추천 테스트, 지금 시작하세요!',
        url: `${process.env.NEXT_PUBLIC_SERVICE_DOMAIN}/mbti_graph_img.webp`,
        siteName: 'MBTI 자취',
        images: [
            {
                url: '/mbti_graph_img',
                width: 1200,
                height: 630,
                alt: 'MBTI 자취 테스트 대표 이미지'
            }
        ],
        type: 'website'
    }
};

export default function MbtiLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
