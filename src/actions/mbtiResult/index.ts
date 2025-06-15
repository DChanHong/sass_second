import { useMutation, useQuery } from '@tanstack/react-query';
import { createMbtiResult, getMbtiResult } from '@/fetchers/mbtiResult';
import { MBTILivingWrapper, MbtiResult } from '@/types/mbtLiving';

export const useCreateMbtiResult = () => {
    return useMutation({
        mutationFn: createMbtiResult,
        onSuccess: (data) => {
            console.log('✅ MBTI 결과 생성 성공:', data);
            // 예: 이동, 상태 갱신 등 후속 작업
            return data;
        },
        onError: (error) => {
            console.error('❌ MBTI 결과 생성 중 에러:', error);
        }
    });
};

export const useMbtiResult = (uuid: string) => {
    return useQuery<MBTILivingWrapper<MbtiResult>>({
        queryKey: ['getMbtiResult', uuid],
        queryFn: () => getMbtiResult(uuid),
        enabled: !!uuid, // uuid가 있을 때만 요청
        staleTime: 1000 * 60, // 1분 캐싱
        retry: 1, // 실패 시 1회 재시도
        refetchOnWindowFocus: false // 포커스시 재요청 X
    });
};