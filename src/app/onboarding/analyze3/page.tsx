'use client'
import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import AnalyzeFooter from "@/components/Onboarding/Analyze/AnalyzeFooter";
import OnboardingTitle from "@/components/Onboarding/OnboardingTitle";
import AnalyzeContainer from "@/components/Onboarding/Analyze/AnalyzeContainer";
import AnalyzeImageContainer from "@/components/Onboarding/Analyze/AnalyzeImageContainer";
import {useRouter} from "next/navigation";
import GenreButton from "@/components/Onboarding/Analyze/GenreButton";
import GenreContainer from "@/components/Onboarding/Analyze/GenreContainer";
import {GENRE} from "@/constants/analyze";

export default function Page() {

    const router = useRouter();
    const buttonClick = () => {
        router.push('/onboarding/analyze4')
    }
    return (
        <>
            <OnboardingHeader backButton={true}/>
            <OnboardingTitle>내가 관심있는 미술 장르를<br/>전부 골라주세요.</OnboardingTitle>
            <GenreContainer>
                {GENRE.map((genre,index) => (
                    <GenreButton key={genre}>
                        {genre}
                    </GenreButton>
                ))}
            </GenreContainer>
            <AnalyzeFooter buttonText={'다음'} nextButton={'취향분석 다음에 하기'} onClick={buttonClick}/>


        </>
    )
}