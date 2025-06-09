import { CreateMbtiResultDto } from '@/lib/api/dto/mbti/mbtiLivingDto';
import { insertMbtiResult, selectMbtiResultByType } from '@/lib/api/repository/mbti/mbtiLivingRepository';


export async function createMbtiLivingResult(dto: CreateMbtiResultDto) {
    return await insertMbtiResult(dto);
}


export async function getMbtiResultByType(mbtiType: string) {
    return await selectMbtiResultByType(mbtiType);
}

