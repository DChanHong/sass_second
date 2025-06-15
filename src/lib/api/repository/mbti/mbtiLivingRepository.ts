import { supabaseServer } from '@/lib/supabase/server/supabse';
import { CreateMbtiResultDto } from '@/lib/api/dto/mbti/mbtiLivingDto';

export default class MbtiLivingRepository {
    async insertMbtiResult(dto: CreateMbtiResultDto) {
        try {
            const { data, error } = await supabaseServer
                .from('mbtiLivingResult')
                .insert([{
                    mbtiCode: dto.mbtiCode,
                    preferenceSummary: dto.preferenceSummary,
                    mbtiAnalysisSummary: dto.mbtiAnalysisSummary,
                    selections: dto.selections,
                    scene: dto.scene
                }])
                .select()
                .single();

            if (error) {
                console.error('❌ Supabase insert error:', error);
                throw new Error(error.message);
            }

            console.log('✅ Supabase insert success:', data);
            return data;
        } catch (err) {
            console.error('❗️insertMbtiResult 실행 중 오류 발생:', err);
            throw err;
        }
    }

    // ✅ uuid로 단일 결과 조회
    async selectMbtiResultByUuid(uuid: string) {
        try {
            const { data, error } = await supabaseServer
                .from('mbtiLivingResult')
                .select(`
                    *,
                    mbti:mbti_living_result_mbti_code_fkey(*)  -- 외래키로 연결된 mbti 테이블 전체를 가져오기
                  `)
                .eq('uuid', uuid)
                .single();

            if (error) {
                console.error('❌ Supabase select error:', error);
                throw new Error(error.message);
            }

            console.log('✅ Supabase select success:', data);
            return data;
        } catch (err) {
            console.error('❗️selectMbtiResultByUuid 실행 중 오류 발생:', err);
            throw err;
        }
    }
}


