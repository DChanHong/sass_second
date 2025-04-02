import axios from 'axios';

// 클라이언트 사이드용 axios 인스턴스
const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전송을 위해 필요
});

// 요청 인터셉터
clientAxios.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
clientAxios.interceptors.response.use(
  (response) => {
    // 응답 데이터 가공
    return response;
  },
  (error) => {
    // 에러 처리
    if (error.response) {
      // 서버가 응답을 반환한 경우
      console.error('API Error:', error.response.data);
      
      // 401 에러 처리 (인증 실패)
      if (error.response.status === 401) {
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
      }
    } else if (error.request) {
      // 요청이 전송되었으나 응답을 받지 못한 경우
      console.error('Network Error:', error.request);
    } else {
      // 요청 설정 중 오류 발생
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default clientAxios; 