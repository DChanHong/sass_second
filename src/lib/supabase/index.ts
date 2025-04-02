import clientSupabase from './client';
import serverSupabase from './server';
import { QueryOptions, User, Session, AuthResponse, UserResponse } from './types';

// 클라이언트 사이드 Supabase 유틸리티
export const clientSupabaseUtils = {
  // 인증 관련 함수
  auth: {
    // 로그인
    signIn: async (email: string, password: string) => {
      const { data, error } = await clientSupabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    },
    
    // 회원가입
    signUp: async (email: string, password: string) => {
      const { data, error } = await clientSupabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    },
    
    // 로그아웃
    signOut: async () => {
      const { error } = await clientSupabase.auth.signOut();
      if (error) throw error;
    },
    
    // 현재 세션 가져오기
    getSession: async (): Promise<AuthResponse> => {
      const response = await clientSupabase.auth.getSession();
      return response;
    },
    
    // 사용자 정보 가져오기
    getUser: async (): Promise<UserResponse> => {
      const response = await clientSupabase.auth.getUser();
      return response;
    },
  },
  
  // 데이터베이스 관련 함수
  db: {
    // 데이터 조회
    select: async <T>(table: string, query?: QueryOptions) => {
      let request = clientSupabase.from(table).select();
      
      if (query) {
        if (query.columns) {
          request = clientSupabase.from(table).select(query.columns);
        }
        if (query.eq) {
          Object.entries(query.eq).forEach(([key, value]) => {
            request = request.eq(key, value);
          });
        }
        if (query.order) {
          Object.entries(query.order).forEach(([key, value]) => {
            request = request.order(key, { ascending: value === 'asc' });
          });
        }
        if (query.limit) request = request.limit(query.limit);
      }
      
      const { data, error } = await request;
      if (error) throw error;
      return data as T[];
    },
    
    // 데이터 삽입
    insert: async <T>(table: string, data: any) => {
      const { data: result, error } = await clientSupabase
        .from(table)
        .insert(data)
        .select();
      
      if (error) throw error;
      return result as T[];
    },
    
    // 데이터 업데이트
    update: async <T>(table: string, data: any, query: QueryOptions) => {
      let request = clientSupabase.from(table).update(data);
      
      if (query) {
        if (query.eq) {
          Object.entries(query.eq).forEach(([key, value]) => {
            request = request.eq(key, value);
          });
        }
      }
      
      const { data: result, error } = await request.select();
      if (error) throw error;
      return result as T[];
    },
    
    // 데이터 삭제
    delete: async <T>(table: string, query: QueryOptions) => {
      let request = clientSupabase.from(table).delete();
      
      if (query) {
        if (query.eq) {
          Object.entries(query.eq).forEach(([key, value]) => {
            request = request.eq(key, value);
          });
        }
      }
      
      const { data, error } = await request.select();
      if (error) throw error;
      return data as T[];
    },
  },
};

// 서버 사이드 Supabase 유틸리티
export const serverSupabaseUtils = {
  // 인증 관련 함수
  auth: {
    // 현재 세션 가져오기
    getSession: async (): Promise<AuthResponse> => {
      const response = await serverSupabase.auth.getSession();
      return response;
    },
    
    // 사용자 정보 가져오기
    getUser: async (): Promise<UserResponse> => {
      const response = await serverSupabase.auth.getUser();
      return response;
    },
  },
  
  // 데이터베이스 관련 함수
  db: {
    // 데이터 조회
    select: async <T>(table: string, query?: QueryOptions) => {
      let request = serverSupabase.from(table).select();
      
      if (query) {
        if (query.columns) {
          request = serverSupabase.from(table).select(query.columns);
        }
        if (query.eq) {
          Object.entries(query.eq).forEach(([key, value]) => {
            request = request.eq(key, value);
          });
        }
        if (query.order) {
          Object.entries(query.order).forEach(([key, value]) => {
            request = request.order(key, { ascending: value === 'asc' });
          });
        }
        if (query.limit) request = request.limit(query.limit);
      }
      
      const { data, error } = await request;
      if (error) throw error;
      return data as T[];
    },
    
    // 데이터 삽입
    insert: async <T>(table: string, data: any) => {
      const { data: result, error } = await serverSupabase
        .from(table)
        .insert(data)
        .select();
      
      if (error) throw error;
      return result as T[];
    },
    
    // 데이터 업데이트
    update: async <T>(table: string, data: any, query: QueryOptions) => {
      let request = serverSupabase.from(table).update(data);
      
      if (query) {
        if (query.eq) {
          Object.entries(query.eq).forEach(([key, value]) => {
            request = request.eq(key, value);
          });
        }
      }
      
      const { data: result, error } = await request.select();
      if (error) throw error;
      return result as T[];
    },
    
    // 데이터 삭제
    delete: async <T>(table: string, query: QueryOptions) => {
      let request = serverSupabase.from(table).delete();
      
      if (query) {
        if (query.eq) {
          Object.entries(query.eq).forEach(([key, value]) => {
            request = request.eq(key, value);
          });
        }
      }
      
      const { data, error } = await request.select();
      if (error) throw error;
      return data as T[];
    },
  },
}; 