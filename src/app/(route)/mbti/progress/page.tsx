'use server';
import React from 'react';
import Layout from '@/components/common/Layout/Layout';
import ClientPage from '@/app/(route)/mbti/progress/_components/ClientPage';

export default async function Page({ searchParams }: any) {
    const resolvedSearchParams = await searchParams;

    const stepParam = resolvedSearchParams?.step;
    const sceneParam = resolvedSearchParams?.scene;

    const step = typeof stepParam === 'string' ? stepParam : 'scene';
    const scene = typeof sceneParam === 'string' ? sceneParam : 'alone';

    return (
        <Layout>
            <ClientPage step={step} scene={scene} />
        </Layout>
    );
}