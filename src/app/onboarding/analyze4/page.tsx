'use client'
import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import AnalyzeFooter from "@/components/Onboarding/Analyze/AnalyzeFooter";
import OnboardingTitle from "@/components/Onboarding/OnboardingTitle";

import {useRouter} from "next/navigation";
import GenreButton from "@/components/Onboarding/Analyze/GenreButton";
import GenreContainer from "@/components/Onboarding/Analyze/GenreContainer";
import {COLOR} from "@/constants/analyze";

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
                    <GenreButton key={color[index]}>
                        {color}
                    </GenreButton>
                ))}
            </GenreContainer>
            <AnalyzeFooter buttonText={'취향분석 완료'} nextButton={'취향분석 다음에 하기'} onClick={buttonClick}/>


        </>
    )
}