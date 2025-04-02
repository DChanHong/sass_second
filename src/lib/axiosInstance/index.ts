import clientAxios from './client';
import serverAxios from './server';

// API 응답 타입
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

// 클라이언트 사이드 API 요청 함수
export const clientApi = {
  // GET 요청
  get: async <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await clientAxios.get<ApiResponse<T>>(url, { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
    }
  },
  
  // POST 요청
  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await clientAxios.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
    }
  },
  
  // PUT 요청
  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await clientAxios.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
    }
  },
  
  // DELETE 요청
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await clientAxios.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
    }
  },
};

// 서버 사이드 API 요청 함수
export const serverApi = {
  // GET 요청
  get: async <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await serverAxios.get<ApiResponse<T>>(url, { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
    }
  },
  
  // POST 요청
  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await serverAxios.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
    }
  },
  
  // PUT 요청
  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await serverAxios.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
    }
  },
  
  // DELETE 요청
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await serverAxios.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
    }
  },
}; 