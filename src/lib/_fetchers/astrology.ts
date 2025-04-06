import clientAxios from "../axiosInstance/client";
import {
  WesternAstrologyFormData,
  WheelChartResponse,
  InterpretationResponse,
  HoroscopeResponse,
} from "../_types/astrology";

/**
 * 휠차트 생성 API 요청
 */
export const fetchWheelChart = async (
  data: WesternAstrologyFormData
): Promise<WheelChartResponse> => {
  const response = await clientAxios.post<WheelChartResponse>(
    "/astrology/wheel-chart",
    data
  );
  return response.data;
};

/**
 * 해석 결과 API 요청
 */
export const fetchInterpretation = async (
  wheelChartId: string
): Promise<InterpretationResponse> => {
  const response = await clientAxios.get<InterpretationResponse>(
    `/astrology/interpretation/${wheelChartId}`
  );
  return response.data;
};

/**
 * 호러스코프 결과 API 요청
 */
export const fetchHoroscope = async (
  wheelChartId: string
): Promise<HoroscopeResponse> => {
  const response = await clientAxios.get<HoroscopeResponse>(
    `/astrology/horoscope/${wheelChartId}`
  );
  return response.data;
};
