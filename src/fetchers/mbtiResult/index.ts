import axiosClient from '@/lib/axios/axiosClient';
import { MBTILivingWrapper, MbtiResult } from '@/types/mbtLiving';

const END_POINT = {
    CREATE_MBTI_RESULT: '/api/v1/mbti/living/result',
    GET_MBTI_RESULT_SINGLE: '/api/v1/mbti/living/result/detail'

};

export const createMbtiResult = async (data: any): Promise<MBTILivingWrapper<MbtiResult>> => {
    const bodyData = data;

    try {
        const response = await axiosClient.post(END_POINT.CREATE_MBTI_RESULT, bodyData);
        return response.data;
    } catch (error) {
        console.error('❌ MBTI 결과 생성 실패:', error);
        throw error;
    }
};

export const getMbtiResult = async (uuid: string) => {
    try {
        const response = await axiosClient.get<MBTILivingWrapper<MbtiResult>>(END_POINT.GET_MBTI_RESULT_SINGLE, {
            params: {
                resultUuid: uuid
            }
        });
        return response.data;
    } catch (error) {
        console.error('❌ MBTI 결과 생성 실패:', error);
        throw error;
    }
};