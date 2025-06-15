import { useQuery } from '@tanstack/react-query';
import { getMbtiList } from '@/fetchers/mbti';
import { MBTInterfaceWrapper, MBTIResponse } from '@/types/mbti';

export const useMbtiList = () => {
    return useQuery<MBTInterfaceWrapper<MBTIResponse[]>>({
        queryKey: ['getMbtiList'],
        queryFn: getMbtiList,
        staleTime: 1000 * 60, // 1분 캐싱
        retry: 1, // 실패 시 1번 재시도
        refetchOnWindowFocus: false // 탭 포커싱 시 재요청 X
    });
};