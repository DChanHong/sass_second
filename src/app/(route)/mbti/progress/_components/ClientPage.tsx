'use client';
import React, { useEffect, useState } from 'react';
import DirectItem from '@/app/(route)/mbti/progress/_components/DirectItem';
import MbtiStart from '@/app/(route)/mbti/progress/_components/MbtiStart';
import Loader from '@/components/common/Loader/Loader';
import { useMbtiList } from '@/actions/mbti';
import { useCreateMbtiResult } from '@/actions/mbtiResult';
import { useRouter } from 'next/navigation';

const ClientPage = ({ step, scene }: {
    step: string;
    scene: string;
}) => {
    const router = useRouter();
    // 엠비티이 리스트 불러오기
    const { data: mbtiList, status } = useMbtiList();
    const { mutateAsync } = useCreateMbtiResult();

    const [isLoading, setIsLoading] = useState(false);

    const completeTest = async (data: any) => {
        try {
            setIsLoading(true);
            const result = await mutateAsync(data);
            console.log('MBTI 저장 성공:', result);
            if (result.result) {
                router.push(`/mbti/complete/${result.data}`);
            } else {

            }
        } catch (err) {
            console.error('저장 실패:', err);
        } finally {
            setIsLoading(false);
        }
    };


    const renderStep = (step: string, scene: string) => {
        // 엠비티아이부터 시작
        // TODO : MBTI 진행시 검사 진행 시 
        if (step === 'mbti') {
            return (
                <MbtiStart step={step} scene={scene} />
            );
        }

        // 상황부터 시작
        if (step === 'scene') {
            return (
                <DirectItem
                    step={step}
                    scene={scene}
                    mbtiList={mbtiList?.data ?? []}
                    completeTest={completeTest}
                    setIsLoading={setIsLoading}
                />
            );
        }
    };


    return (
        <div
            className="w-full max-w-[640px] h-[600px] relative flex items-center justify-center mt-[10px]">
            {status !== 'success' && <Loader />}
            {isLoading && <Loader />}
            {renderStep(step, scene)}
        </div>

    );
};

export default ClientPage;
