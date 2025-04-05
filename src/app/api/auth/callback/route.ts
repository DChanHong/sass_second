import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  console.log("code", code);

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      await supabase.auth.exchangeCodeForSession(code);

      // 인증 성공 시 항상 홈화면으로 리다이렉트
      return NextResponse.redirect(new URL("/", requestUrl.origin));
    } catch (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=Authentication failed`
      );
    }
  }

  // 코드가 없는 경우도 홈화면으로 리다이렉트
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
