import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import { cookies } from 'next/headers'
import {parse} from 'cookie';


export const { handlers, auth,signOut,signIn } = NextAuth({
    pages:{signIn:'/onboarding/login'},
    providers: [Kakao,Naver,Facebook,Google,Apple,Credentials({
        credentials:{
          email:{},
          password:{},
        },
        authorize: async (credentials) => {
            try {
                const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: credentials.email,
                        password: credentials.password,
                    }),
                });
                if (!authResponse.ok) {
                    throw new Error(`Failed to authenticate: ${authResponse.statusText}`);
                }
                const user = await authResponse.json();
                return {
                email: user.id,
                ...user,};
            } catch (error) {
                console.error('Error during authentication:', error);
                return null;
            }
        }
    }),
    ]
});