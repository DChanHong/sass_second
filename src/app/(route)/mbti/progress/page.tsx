'use server';
import React from 'react';
import Layout from '@/components/common/Layout/Layout';
import ClientPage from '@/app/(route)/mbti/progress/_components/ClientPage';

type Props = {
    searchParams: {
        // value : mbti(mbti 부터) ,scene(주어진 상황부터 바로 시작)
        // default : scene
        step?: string;
        // 해당 상황 정보
        // deafult : alone
        scene?: string;
    };
};

export interface ServerProgressProps {
    step: string;
    scene: string;
}

export default async function Page({ searchParams }: Props) {
    const step = typeof searchParams?.step === 'string' ? searchParams?.step : 'scene';
    const scene = typeof searchParams?.scene === 'string' ? searchParams?.scene : 'alone';

    return (
        <Layout>
            <ClientPage step={step} scene={scene} />
        </Layout>
    );
};