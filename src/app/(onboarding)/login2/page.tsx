import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import OnboardingLoginForm from "@/components/Onboarding/OnboardingLoginForm";

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
        </>
    )
}