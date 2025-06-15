'use client';
import React, { useState, useEffect } from 'react';
import { mbtiTypesDetailed } from '@/mockupData/mbti';

const Loader = () => {
    const [index, setIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const current = mbtiTypesDetailed[index];
    const previous = prevIndex !== null ? mbtiTypesDetailed[prevIndex] : null;

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevIndex(index);
            setIndex((prev) => (prev + 1) % mbtiTypesDetailed.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center">
            <div className="relative w-[240px] h-[80px] overflow-hidden">
                {/* 이전 텍스트 (사라짐) */}
                {previous && (
                    <div
                        key={`prev-${previous.type}`}
                        className={`absolute inset-0 flex items-center justify-center text-6xl font-extrabold tracking-widest ${previous.text} animate-wipeOut`}
                    >
                        {previous.type}
                    </div>
                )}

                {/* 현재 텍스트 (등장) */}
                <div
                    key={`curr-${current.type}`}
                    className={`absolute inset-0 flex items-center justify-center text-6xl font-extrabold tracking-widest ${current.text} animate-fadeIn`}
                >
                    {current.type}
                </div>
            </div>

            <style jsx>{`
                @keyframes wipeOut {
                    0% {
                        opacity: 1;
                        mask-image: linear-gradient(to right, black 100%, transparent 100%);
                        -webkit-mask-image: linear-gradient(to right, black 100%, transparent 100%);
                    }
                    100% {
                        opacity: 0;
                        mask-image: linear-gradient(to right, black 0%, transparent 100%);
                        -webkit-mask-image: linear-gradient(to right, black 0%, transparent 100%);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-wipeOut {
                    animation: wipeOut 1.2s ease-in-out forwards;
                }

                .animate-fadeIn {
                    animation: fadeIn 1.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Loader;
