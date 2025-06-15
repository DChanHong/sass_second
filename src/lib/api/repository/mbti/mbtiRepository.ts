import { supabaseServer } from '@/lib/supabase/server/supabse';

export default class MbtiRepository {
    async getAllMbti() {
        const { data, error } = await supabaseServer
            .from('mbti')
            .select('*')
            .order('sorting', { ascending: true });

        if (error) throw new Error(error.message);
        return data;
    }
}

