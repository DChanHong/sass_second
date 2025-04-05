"use server";
import Header from "./Header";
import {getServerSession} from "@/lib/supabase/userAuth";

export default async function ServerHeader() {
    const session = await getServerSession()

    return <Header isLoggedIn={!!session}/>;
}
