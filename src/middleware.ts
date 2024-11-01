import {auth} from "@/auth";
import {NextResponse} from "next/server";


export async function middleware(){
    const session = await auth();
    if(!session){
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/onboarding`);
    }
}

export const config = {
    matcher: ['/home/:path*'],
}