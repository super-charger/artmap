import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import OnboardingLoginForm from "@/components/Onboarding/OnboardingLoginForm";
import NextKakao from "@/components/Nextauth/NextKakao";
import NextNaver from "@/components/Nextauth/NextNaver";
import NextFacebook from "@/components/Nextauth/NextFacebook";
import NextGoogle from "@/components/Nextauth/NextGoogle";
import NextApple from "@/components/Nextauth/NextApple";

export default async function Page() {
    const session = await auth()
    if (session?.user) {
        redirect('/signup')
    }
    return (
        <>
            <OnboardingHeader/>
            <div className="justify-center w-full h-1/4 flex items-center">
                <div
                    className="absolute text-center text-[#1a1a1a] text-[26px] font-bold font-['Noto Sans KR'] leading-[38px]">로그인
                </div>
            </div>
            <OnboardingLoginForm/>
            <div className="border-t m-[16px] mt-40">
            <div
                className="text-center text-[#808080] text-base font-normal font-['Noto Sans KR'] leading-[18px] mb-10 mt-[20px]">소셜
                계정으로 간편 로그인/회원가입
            </div>
            <div className="flex gap-10 items-center justify-center">
            <div className="w-11 h-11">
                <NextKakao/>
            </div>
            <div className="w-11 h-11">
                <NextNaver/>
            </div>
            <div className="w-11 h-11">
                <NextFacebook/>
            </div>
            <div className="w-11 h-11">
                <NextGoogle/>
            </div>
            <div className="w-11 h-11">
                <NextApple/>
            </div>
            </div>
            </div>
        </>
    )
}