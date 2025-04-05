import {NextResponse} from "next/server";
import {getServerSession} from "@/lib/supabase/userAuth";

export async function userWrapper(handler: Function) {
    return async (request: Request) => {
        try {
            // Get the session
            const session = await getServerSession()

            if (!session) {
                return NextResponse.json({error: "Unauthorized"}, {status: 401});
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
                {error: "Internal server error"},
                {status: 500}
            );
        }
    };
}
