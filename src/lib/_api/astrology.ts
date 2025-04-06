import {
  fetchWheelChart,
  fetchInterpretation,
  fetchHoroscope,
} from "../_fetchers/astrology";
import {
  WesternAstrologyFormData,
  WheelChartResponse,
  InterpretationResponse,
  HoroscopeResponse,
} from "../_types/astrology";

/**
 * 서양 점성술 휠차트를 생성하는 서비스 함수
 * @param data 사용자 입력 데이터 (생년월일, 생시, 위치, 시간대, 하우스 시스템)
 * @returns 휠차트 이미지 URL과 성공 여부를 포함한 응답
 */
export const generateWheelChart = async (
  data: WesternAstrologyFormData
): Promise<any> => {
  try {
    return await fetchWheelChart(data);
  } catch (error: any) {
    console.error("휠차트 생성 중 오류 발생:", error);

    // 에러 응답 처리
    if (error.response) {
      // 서버에서 응답이 왔지만 에러 상태 코드인 경우
      return {
        wheelChartUrl: "",
        success: false,
        message:
          error.response.data?.error || "휠차트 생성 중 오류가 발생했습니다.",
      };
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      return {
        wheelChartUrl: "",
        success: false,
        message: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
      };
    } else {
      // 요청 설정 중 오류가 발생한 경우
      return {
        wheelChartUrl: "",
        success: false,
        message: "요청 처리 중 오류가 발생했습니다.",
      };
    }
  }
};

/**
 * 서양 점성술 해석을 가져오는 서비스 함수
 * @param wheelChartId 휠차트 ID
 * @returns 해석 결과
 */
export const getAstrologyInterpretation = async (
  wheelChartId: string
): Promise<InterpretationResponse> => {
  try {
    return await fetchInterpretation(wheelChartId);
  } catch (error: any) {
    console.error("해석 가져오기 중 오류 발생:", error);

    return {
      interpretation: "",
      success: false,
      message: "해석 결과를 가져오는 중 오류가 발생했습니다.",
    };
  }
};

/**
 * 서양 점성술 호러스코프를 가져오는 서비스 함수
 * @param wheelChartId 휠차트 ID
 * @returns 호러스코프 결과
 */
export const getHoroscope = async (
  wheelChartId: string
): Promise<HoroscopeResponse> => {
  try {
    return await fetchHoroscope(wheelChartId);
  } catch (error: any) {
    console.error("호러스코프 가져오기 중 오류 발생:", error);

    return {
      horoscope: "",
      success: false,
      message: "호러스코프 결과를 가져오는 중 오류가 발생했습니다.",
    };
  }
};
