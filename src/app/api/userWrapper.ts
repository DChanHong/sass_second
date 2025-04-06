import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/supabase/userAuth";
import { User } from "@/lib/supabase/types";

// Supabase user를 추가한 Request 타입
export type RequestWithUser = Request & {
  user: User;
};

export function userWrapper(
  handler: (req: RequestWithUser) => Promise<Response>
) {
  return async (request: Request): Promise<Response> => {
    try {
      const session = await getServerSession();
      // console.log("session", session);

      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const reqWithUser = request as RequestWithUser;

      reqWithUser.user = {
        id: session.user?.id || "",
        email: session.user?.email || "",
        name: session.user?.user_metadata?.name || "",
        provider: session.user?.app_metadata?.provider || "",
      };

      return handler(reqWithUser);
    } catch (error) {
      console.error("userWrapper Error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
