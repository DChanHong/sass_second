import clientAxios from '@/lib/axiosInstance/client';
import { AstrologyRequestParams, AstrologyResponse, Horoscope } from './types';

export const astrologyApi = {
  // 운세 정보 가져오기
  getHoroscope: async (params: AstrologyRequestParams): Promise<AstrologyResponse<Horoscope>> => {
    const response = await clientAxios.post<AstrologyResponse<Horoscope>>('/api/astrology', params);
    return response.data;
  },
}; 