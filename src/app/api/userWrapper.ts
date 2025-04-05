import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function userWrapper(handler: Function) {
  return async (request: Request) => {
    try {
      // Create a Supabase client
      const supabase = createServerComponentClient({ cookies });

      // Get the session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        return NextResponse.json(
          { error: "Authentication error" },
          { status: 401 }
        );
      }

      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Add the user to the request context
      const requestWithUser = {
        ...request,
        user: session.user,
      };

      // Call the handler with the modified request
      return handler(requestWithUser);
    } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
