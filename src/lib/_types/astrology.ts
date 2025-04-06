/**
 * 서양 점성술 폼 데이터 타입
 */
export interface WesternAstrologyFormData {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
  house_type: string;
}

/**
 * 휠차트 응답 타입
 */
export interface WheelChartResponse {
  wheelChartUrl: string;
  success: boolean;
  message?: string;
}

/**
 * 해석 결과 타입
 */
export interface InterpretationResponse {
  interpretation: string;
  success: boolean;
  message?: string;
}

/**
 * 호러스코프 결과 타입
 */
export interface HoroscopeResponse {
  horoscope: string;
  success: boolean;
  message?: string;
}
