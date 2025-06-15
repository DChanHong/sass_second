import React from 'react';
import Link from 'next/link';

const BounceCtaButton = () => {
    return (
        <div className="fixed bottom-20 left-1/2 z-50 floating-cta">
            <Link
                href="/mbti/start"
                className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors duration-300 shadow-lg hover:shadow-xl cta-button"
            >
                3분 만에 자취스타일 알아보기 →
            </Link>
            <style jsx>{`
                .floating-cta {
                    animation: bounceIn 0.8s ease-out;
                    transform: translateX(-50%);
                }

                @keyframes bounceIn {
                    0% {
                        transform: translateX(-50%) translateY(100%);
                        opacity: 0;
                    }
                    30% {
                        transform: translateX(-50%) translateY(-20%);
                        opacity: 1;
                    }
                    50% {
                        transform: translateX(-50%) translateY(10%);
                    }
                    70% {
                        transform: translateX(-50%) translateY(-5%);
                    }
                    100% {
                        transform: translateX(-50%) translateY(0%);
                    }
                }
            `}</style>
        </div>
    );
};

export default BounceCtaButton;
