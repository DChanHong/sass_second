import { useQuery } from '@tanstack/react-query';
import { getMbtiList, getContentList } from '@/fetchers/mbti';
import { MBTIResponse } from '@/types/mbti';
import type { ApiResult } from '@/types/api';
import type { ContentListResponseDto } from '@/lib/api/dto/mbti/mbtiContentDto';

export const useMbtiList = () => {
    return useQuery<ApiResult<MBTIResponse[]>>({
        queryKey: ['getMbtiList'],
        queryFn: getMbtiList,
        staleTime: 1000 * 60, // 1분 캐싱
        retry: 1, // 실패 시 1번 재시도
        refetchOnWindowFocus: false // 탭 포커싱 시 재요청 X
    });
};

type UseMbtiContentListParams = {
    mbtiCode: string;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'uuid';
    sortOrder?: 'asc' | 'desc';
};

export const useMbtiContentList = (params: UseMbtiContentListParams) => {
    const { mbtiCode, page, limit, sortBy, sortOrder } = params;

    return useQuery<ApiResult<ContentListResponseDto>>({
        queryKey: ['getContentList', mbtiCode, page, limit, sortBy, sortOrder],
        queryFn: () => getContentList({ mbtiCode, page, limit, sortBy, sortOrder }),
        enabled: !!mbtiCode,
        staleTime: 1000 * 60, // 1분 캐싱
        retry: 1,
        refetchOnWindowFocus: false
    });
};