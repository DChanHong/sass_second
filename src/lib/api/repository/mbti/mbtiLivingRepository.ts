import { supabaseServer } from '@/lib/supabase/server/supabse';
import { CreateMbtiResultDto } from '@/lib/api/dto/mbti/mbtiLivingDto';

export async function insertMbtiResult(dto: CreateMbtiResultDto) {
    const { data, error } = await supabaseServer
        .from('mbtiByLivingResult')
        .insert([{
            mbtiType: dto.mbtiType,
            mbtiTitle: dto.mbtiTitle,
            mbtiDescription: dto.mbtiDescription,
            preferences: dto.preferences,
            selections: dto.selections
        }])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function selectMbtiResultByType(mbtiType: string) {
    const { data, error } = await supabaseServer
        .from('mbtiByLivingResult')
        .select('*')
        .eq('mbtiType', mbtiType)
        .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
}
