import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getSupabaseServerClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (name) => cookieStore.get(name)?.value,
            },
        }
    );
}

export async function getServerSession() {
    try {
        const supabase = await getSupabaseServerClient();
        const {
            data: { session },
        } = await supabase.auth.getSession();

        return session;
    } catch (error) {
        console.error("getServerSession error:", error);
        return null;
    }
}
