// 서버에서 사용 (service role key 사용 가능)
import { createClient } from '@supabase/supabase-js';

export const supabaseServer = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);
