// 클라이언트에서 사용 (anon public key)
import { createBrowserClient } from '@supabase/ssr';

export const supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);