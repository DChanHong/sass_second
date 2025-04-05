// Supabase 쿼리 옵션 타입
export interface QueryOptions {
    columns?: string;
    eq?: Record<string, any>;
    order?: Record<string, 'asc' | 'desc'>;
    limit?: number;
}

// API 응답 타입
export interface ApiResponse<T = any> {
    data: T;
    status: number;
    message?: string;
}

// 사용자 타입
export interface User {
    id: string;
    email: string;
    name: string;
    provider: string;
}

// 세션 타입
export interface Session {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    user: any;
}

// Supabase 인증 응답 타입
export interface AuthResponse {
    data: {
        session: Session | null;
    } | null;
    error: Error | null;
}

// Supabase 사용자 응답 타입
export interface UserResponse {
    data: {
        user: User | null;
    } | null;
    error: Error | null;
} 