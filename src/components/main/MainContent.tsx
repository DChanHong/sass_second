'use client';

import Section3 from '@/components/main/Section3';
import Section1 from '@/components/main/Section1';
import Section2 from '@/components/main/Section2';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import BounceCtaButton from '@/components/main/BounceCTAButton';
import { useMbtiList } from '@/actions/mbti';

export default function MainContent() {

    const ctaRef = useRef<HTMLAnchorElement | null>(null);
    const [showFloating, setShowFloating] = useState(false);
    const { data: mbtiList } = useMbtiList();
    

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowFloating(!entry.isIntersecting); // 화면에 보이지 않으면 true
            },
            {
                threshold: 0.1
            }
        );

        if (ctaRef.current) {
            observer.observe(ctaRef.current);
        }

        return () => {
            if (ctaRef.current) {
                observer.unobserve(ctaRef.current);
            }
        };
    }, []);

    return (
        <main className="min-h-screen w-[95%] m-auto sm:w-full">
            <Section1 ctaRef={ctaRef} />
            <Section2 mbtiList={mbtiList?.data || []} />
            <Section3 />
            {/* 하단 고정 CTA 버튼 (원래 버튼이 보이지 않을 때만) */}
            {showFloating && (
                <BounceCtaButton />
            )}
        </main>
    );
}
