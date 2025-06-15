import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVICE_DOMAIN, // 예: 'https://api.example.com'
    headers: {
        'Content-Type': 'application/json'
    }
});

// 💡 요청 인터셉터 (토큰 등 추가 가능)
axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// 💡 응답 인터셉터 (에러 공통 처리 등)
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;