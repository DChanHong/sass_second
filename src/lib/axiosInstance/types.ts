
import clientAxios from './client';
import serverAxios from './server';

// API 응답 타입
// T는 실제 응답 데이터의 타입을 의미하며, 기본값은 any입니다.
// 예: ApiResponse<User> -> data는 User 타입을 가짐
export interface ApiResponse<T = any> {
	data: T;               // 실제 응답 데이터
	status: number;        // HTTP 응답 상태 코드 (예: 200, 404 등)
	message?: string;      // 선택적 메시지 (에러 또는 알림용)
}

// 클라이언트 사이드 API 요청 함수 모음
export const clientApi = {
	/**
	 * GET 요청을 보냅니다.
	 * @param url - 요청할 엔드포인트
	 * @param params - 쿼리 파라미터
	 * @returns ApiResponse<T> 타입의 Promise를 반환합니다.
	 */
	get: async <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
		try {
			const response = await clientAxios.get<ApiResponse<T>>(url, { params });
			return response.data;
		} catch (error: any) {
			throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
		}
	},

	/**
	 * POST 요청을 보냅니다.
	 * @param url - 요청할 엔드포인트
	 * @param data - 전송할 데이터 (body)
	 * @returns ApiResponse<T> 타입의 Promise를 반환합니다.
	 */
	post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
		try {
			const response = await clientAxios.post<ApiResponse<T>>(url, data);
			return response.data;
		} catch (error: any) {
			throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
		}
	},

	/**
	 * PUT 요청을 보냅니다.
	 * @param url - 요청할 엔드포인트
	 * @param data - 수정할 데이터 (body)
	 * @returns ApiResponse<T> 타입의 Promise를 반환합니다.
	 */
	put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
		try {
			const response = await clientAxios.put<ApiResponse<T>>(url, data);
			return response.data;
		} catch (error: any) {
			throw error.response?.data || { message: '알 수 없는 오류가 발생했습니다.' };
		}
	},

	/**
	 * DELETE 요청을 보냅니다.
	 * @param url - 요청할 엔드포인트
	 * @returns ApiResponse<T> 타입의 Promise를 반환합니다.
	 */
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