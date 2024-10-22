import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";



export const { handlers, auth,signOut,signIn } = NextAuth({
    providers: [Kakao,Naver,Facebook,Google,Apple],
})