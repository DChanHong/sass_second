'use server';
import React from 'react';
import Layout from '@/components/common/Layout/Layout';
import ClientPage from '@/app/(route)/mbti/progress/_components/ClientPage';

export default async function Page({ searchParams }: any) {
    const step = typeof searchParams?.step === 'string' ? searchParams.step : 'scene';
    const scene = typeof searchParams?.scene === 'string' ? searchParams.scene : 'alone';

    return (
        <Layout>
            <ClientPage step={step} scene={scene} />
        </Layout>
    );
}