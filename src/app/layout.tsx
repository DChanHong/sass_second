import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'MBTI 자취템 추천 - 나만의 자취 공간을 찾아보세요',
    description: 'MBTI 성향에 따라 딱 맞는 자취템을 추천해드립니다. 공간 활용, 인테리어 취향, 실용성까지 모두 고려한 스마트한 쇼핑 경험을 지금 시작하세요.'
}


export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
        <body className={inter.className} suppressHydrationWarning={true}>
        <div className="flex flex-col min-h-screen min-w-[350px]">
            <main className="flex-grow">{children}</main>
        </div>
        </body>
        </html>
    )
}
