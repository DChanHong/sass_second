import axiosClient from '@/lib/axios/axiosClient';
import { MBTInterfaceWrapper, MBTIResponse } from '@/types/mbti';

const END_POINT = {
    MBTI_LIST: '/api/v1/mbti/list'
};
export const getMbtiList = async (): Promise<MBTInterfaceWrapper<MBTIResponse[]>> => {
    try {
        const response = await axiosClient.get<MBTInterfaceWrapper<MBTIResponse[]>>(END_POINT.MBTI_LIST);
        return response.data;
    } catch (error) {
        console.error('❌ MBTI 리스트 요청 중 오류 발생:', error);
        throw error;
    }
};