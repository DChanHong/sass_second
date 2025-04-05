import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    const response = NextResponse.redirect(new URL("/", requestUrl.origin));

    if (code) {
        const cookieStore = await cookies();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll(); // 모든 쿠키 가져오기
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options); // 쿠키 설정
                        });
                    },
                },
                cookieOptions: {
                    // 보안 옵션 추가
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7, // 1주일
                }
            }
        );

        try {
            // code만으로 세션 교환 시도
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);

            if (error) {
                console.error("Auth error:", error);
                return NextResponse.redirect(
                    `${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`
                );
            }

            // 성공적으로 인증됨
            console.log("Authentication successful");

        } catch (error: any) {
            console.error("Auth callback error:", error);
            return NextResponse.redirect(
                `${requestUrl.origin}/login?error=Authentication failed`
            );
        }

        return response;
    }

    // code가 없는 경우
    return NextResponse.redirect(`${requestUrl.origin}/login?error=No authentication code provided`);
}