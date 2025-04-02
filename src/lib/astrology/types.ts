// 기본 요청 파라미터 타입
export interface AstrologyRequestParams {
  date: string;  // YYYY-MM-DD 형식
  time: string;  // HH:mm 형식
  latitude: number;
  longitude: number;
  timezone: number;
}

// 기본 응답 타입
export interface AstrologyResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// 행성 정보 타입
export interface Planet {
  name: string;
  longitude: number;
  latitude: number;
  speed: number;
  house: number;
  sign: string;
  nakshatra: string;
  nakshatra_pada: number;
  is_retro: boolean;
}

// 궁 정보 타입
export interface House {
  house_number: number;
  longitude: number;
  sign: string;
  nakshatra: string;
  nakshatra_pada: number;
}

// 운세 정보 타입
export interface Horoscope {
  planets: Planet[];
  houses: House[];
  aspects: Array<{
    planet1: string;
    planet2: string;
    angle: number;
    orb: number;
  }>;
} 