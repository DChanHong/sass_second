import axiosClient from '@/lib/axios/axiosClient';
import {  MBTIResponse } from '@/types/mbti';
import type { ApiResult } from '@/types/api';
import type { ContentListResponseDto } from '@/lib/api/dto/mbti/mbtiContentDto';

const END_POINT = {
    MBTI_LIST: '/api/v1/mbti/list',
    CONTENT_LIST: '/api/v1/content'
};
export const getMbtiList = async (): Promise<ApiResult<MBTIResponse[]>> => {
    try {
        const response = await axiosClient.get<ApiResult<MBTIResponse[]>>(END_POINT.MBTI_LIST);
        return response.data;
    } catch (error) {
        console.error('❌ MBTI 리스트 요청 중 오류 발생:', error);
        throw error;
    }
};

export type ContentListParams = {
    mbtiCode: string;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'uuid';
    sortOrder?: 'asc' | 'desc';
};

export const getContentList = async (
    params: ContentListParams
): Promise<ApiResult<ContentListResponseDto>> => {
    try {
        const response = await axiosClient.get<ApiResult<ContentListResponseDto>>(END_POINT.CONTENT_LIST, {
            params: {
                mbtiCode: params.mbtiCode,
                page: params.page,
                limit: params.limit,
                sortBy: params.sortBy,
                sortOrder: params.sortOrder
            }
        });
        return response.data;
    } catch (error) {
        console.error('❌ 컨텐츠 리스트 요청 중 오류 발생:', error);
        throw error;
    }
};