'use client';

import { useMbtiContentList } from '@/actions/mbti';
import React from 'react';

const ClientPage = ({ mbtiCode }: { mbtiCode: string }) => {
    const { data: contentList, status: contentListStatus } = useMbtiContentList({ mbtiCode });
    console.log(contentList);
    
    
    return <div>ClientPage</div>;
};

export default ClientPage;