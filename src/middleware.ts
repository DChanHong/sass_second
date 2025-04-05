import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getServerSession} from "@/lib/supabase/userAuth";

// 로그인이 필요하지 않은 public 경로들
const publicRoutes = ["/", "/login", "/signup"];

// 인증 체크 함수
async function authenticateRequest(request: NextRequest) {
    const res = NextResponse.next();

    // 현재 경로가 public route인지 확인
    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

    const session = await getServerSession();

    // 로그인이 필요한 페이지에 접근하려 할 때 로그인이 되어있지 않으면 로그인 페이지로 리다이렉트
    if (!session && !isPublicRoute) {
        console.log("로그인 필요");
        const redirectUrl = new URL("/login", request.url);
        return NextResponse.redirect(redirectUrl);
    }

    // 이미 로그인된 사용자가 로그인/회원가입 페이지에 접근하려 하면 메인 페이지로 리다이렉트
    if (
        session &&
        (request.nextUrl.pathname === "/login" ||
            request.nextUrl.pathname === "/signup")
    ) {
        console.log("이미 로그인한 유저")
        return NextResponse.redirect(new URL("/", request.url));
    }

    return res;
}

export async function middleware(request: NextRequest) {
    // 인증 체크
    const authResponse = await authenticateRequest(request);
    if (authResponse.status !== 200) {
        // return authResponse;
    }

    // 여기에 추가적인 미들웨어 로직을 구현할 수 있습니다.
    // 예: API 요청 제한, 로깅, 헤더 수정 등

    return authResponse;
}

// 미들웨어를 적용할 경로 설정
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api|_next/static|_next/image|favicon.ico|public/).*)",
    ],
};
