'use server';
import React from 'react';
import Layout from '@/components/common/Layout/Layout';
import ClientPage from '@/app/(route)/mbti/progress/_components/ClientPage';

const Page = () => {
    return (
        <Layout>
            <ClientPage />
        </Layout>
    );
};

export default Page;