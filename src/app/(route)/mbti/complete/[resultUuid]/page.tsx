import React from 'react';
import ClientPage from '@/app/(route)/mbti/complete/[resultUuid]/_components/ClientPage';
import Layout from '@/components/common/Layout/Layout';

const MbtiCompletePage = async ({ params }: { params: Promise<{ resultUuid: string }> }) => {
    const { resultUuid } = await params;


    return (
        <Layout>
            <ClientPage resultUuid={resultUuid} />
        </Layout>
    );
};

export default MbtiCompletePage;