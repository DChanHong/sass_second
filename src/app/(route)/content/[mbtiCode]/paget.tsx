import React from 'react';
import Layout from '@/components/common/Layout/Layout';
import ClientPage from './_components/ClientPage';

// 다이나믹 import 처리
// src/app/(route)/content/[mbtiCode]/page.tsx
// [mbtiCode] 부분은 다이나믹 라우팅 처리
const Page = ({ params }: { params: { mbtiCode: string } }) => {
    const { mbtiCode } = params;
    console.log(mbtiCode);
    return (
        <Layout>
            <ClientPage mbtiCode={mbtiCode}/>
        </Layout>
    );
};

export default Page;