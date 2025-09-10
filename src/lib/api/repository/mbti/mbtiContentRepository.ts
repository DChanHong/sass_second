import { supabaseServer } from '@/lib/supabase/server/supabse';
import { ContentListRequestDto } from '@/lib/api/dto/mbti/mbtiContentDto';

export default class MbtiContentRepository {
    
    /**
     * MBTI 코드별 결과물 목록을 페이지네이션으로 조회
     */
    async getMbtiContentList(dto: ContentListRequestDto) {
        try {
            // 전체 개수 조회
            const { count, error: countError } = await supabaseServer
                .from('mbtiLivingResult')
                .select('*', { count: 'exact', head: true })
                .eq('mbtiCode', dto.mbtiCode);

            if (countError) {
                console.error('❌ Count query error:', countError);
                throw new Error(countError.message);
            }

            // 페이지네이션된 데이터 조회
            const { data, error } = await supabaseServer
                .from('mbtiLivingResult')
                .select(`
                    uuid,
                    mbtiCode,
                    createdAt,
                    preferenceSummary,
                    mbtiAnalysisSummary,
                    scene,
                    mbti:mbti_living_result_mbti_code_fkey(
                        code,
                        name,
                        title,
                        bgColor,
                        textColor
                    )
                `)
                .eq('mbtiCode', dto.mbtiCode)
                .order(dto.sortBy, { ascending: dto.sortOrder === 'asc' })
                .range(dto.getOffset(), dto.getOffset() + dto.limit - 1);

            if (error) {
                console.error('❌ Data query error:', error);
                throw new Error(error.message);
            }

            console.log('✅ Content list query success:', { 
                count, 
                dataLength: data?.length,
                mbtiCode: dto.mbtiCode,
                page: dto.page 
            });

            return {
                items: data || [],
                total: count || 0
            };

        } catch (err) {
            console.error('❗️getMbtiContentList 실행 중 오류 발생:', err);
            throw err;
        }
    }

    /**
     * 특정 MBTI 코드의 정보 조회
     */
    async getMbtiInfo(mbtiCode: string) {
        try {
            const { data, error } = await supabaseServer
                .from('mbti')
                .select('*')
                .eq('code', mbtiCode)
                .single();

            if (error) {
                console.error('❌ MBTI info query error:', error);
                throw new Error(error.message);
            }

            console.log('✅ MBTI info query success:', data);
            return data;

        } catch (err) {
            console.error('❗️getMbtiInfo 실행 중 오류 발생:', err);
            throw err;
        }
    }

    /**
     * 모든 MBTI 코드별 결과물 개수 조회
     */
    async getMbtiContentCounts() {
        try {
            const { data, error } = await supabaseServer
                .from('mbtiLivingResult')
                .select('mbtiCode')
                .order('mbtiCode');

            if (error) {
                console.error('❌ Content counts query error:', error);
                throw new Error(error.message);
            }

            // 코드별 개수 집계
            const counts: { [key: string]: number } = {};
            data?.forEach(item => {
                counts[item.mbtiCode] = (counts[item.mbtiCode] || 0) + 1;
            });

            console.log('✅ Content counts query success:', counts);
            return counts;

        } catch (err) {
            console.error('❗️getMbtiContentCounts 실행 중 오류 발생:', err);
            throw err;
        }
    }
}
