'use client'
import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import AnalyzeFooter from "@/components/Onboarding/Analyze/AnalyzeFooter";
import OnboardingTitle from "@/components/Onboarding/OnboardingTitle";

import {useRouter} from "next/navigation";
import GenreButton from "@/components/Onboarding/Analyze/GenreButton";
import GenreContainer from "@/components/Onboarding/Analyze/GenreContainer";
import {COLOR} from "@/constants/analyze";
import OnboardingButton from "@/components/Onboarding/OnboardingButton";
import Link from "next/link";

export default function Page() {

    const router = useRouter();
    const buttonClick = () => {
        router.push('/home/now')
    }
    return (
        <>
            <OnboardingHeader backButton={true}/>
            <OnboardingTitle>내가 관심있는 색상을<br/>전부 골라주세요.</OnboardingTitle>
            <GenreContainer>
                {COLOR.map((color,index) => (
                    <GenreButton key={color}>
                        {color}
                    </GenreButton>
                ))}
            </GenreContainer>
            <div className="absolute inset-x-0 bottom-4 flex flex-col items-center">
                <OnboardingButton bgColor={'purple'} onClick={buttonClick}>취향분석 완료</OnboardingButton>
                <Link href={"/home/now"}
                      className="mt-4 relative text-center text-[#808080] text-base font-normal font-['Noto Sans KR'] underline leading-7">
                    취향분석 다음에 하기
                </Link>
            </div>


        </>
    )
}