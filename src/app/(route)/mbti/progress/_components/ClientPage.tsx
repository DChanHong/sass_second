'use client';
import React from 'react';
import DirectItem from '@/app/(route)/mbti/progress/_components/DirectItem';
import MbtiStart from '@/app/(route)/mbti/progress/_components/MbtiStart';

const ClientPage = ({ step, scene }: {
    step: string;
    scene: string;
}) => {


    const renderTest = (step: string, scene: string) => {
        // 엠비티아이부터 시작
        if (step === 'mbti') {
            return (
                <MbtiStart step={step} scene={scene} />
            );
        }

        // 상황부터 시작
        if (step === 'scene') {
            return (
                <DirectItem step={step} scene={scene} />
            );
        }
    };


    return (
        <div
            className="w-full max-w-[640px] h-[600px] relative flex items-center justify-center mt-[10px]">
            {renderTest(step, scene)}
        </div>

    );
};

export default ClientPage;
