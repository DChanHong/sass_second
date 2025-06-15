import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RQProvider from '@/components/providers/RQProvider';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });

// ✅ SEO 전용 메타데이터
export const metadata = {
    title: 'MBTI 자취 테스트',
    description: '자취 스타일에 맞는 공간을 추천받아보세요!',
    keywords: ['MBTI', '자취', '공간 추천', '자취 테스트'],
    authors: [{ name: 'hong', url: `${process.env.NEXT_PUBLIC_SERVICE_DOMAIN}` }],
    openGraph: {
        title: 'MBTI 자취 테스트',
        description: '나에게 맞는 자취 공간 스타일을 찾아보세요.',
        url: `${process.env.NEXT_PUBLIC_SERVICE_DOMAIN}`,
        siteName: 'MBTI 자취',
        images: [
            {
                url: '/mbti_graph_img.webp', // public 디렉토리에 위치한 OG 이미지
                width: 1200,
                height: 630,
                alt: 'MBTI 자취 테스트 이미지'
            }
        ],
        type: 'website'
    }
};


export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient();
    const dehydratedState = dehydrate(queryClient);
    return (
        <html lang="ko">
        <body className={inter.className} suppressHydrationWarning={true}>
        <div className="flex flex-col min-h-screen min-w-[350px]">
            <RQProvider>
                <HydrationBoundary state={dehydratedState}>
                    <main className="flex-grow">{children}</main>
                </HydrationBoundary>
            </RQProvider>
        </div>
        </body>
        </html>
    );
}
