import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import AnalyzeFooter from "@/components/Onboarding/Analyze/AnalyzeFooter";
import OnboardingTitle from "@/components/Onboarding/OnboardingTitle";
import AnalyzeContainer from "@/components/Onboarding/Analyze/AnalyzeContainer";

export default function Page() {
    return (
        <>
            <OnboardingHeader backButton={true}/>
            <OnboardingTitle>마음에 드는 작품을<br/>골라주세요.</OnboardingTitle>
            <AnalyzeContainer>a</AnalyzeContainer>
            <AnalyzeFooter buttonText={'다음'} nextButton={'취향분석 다음에 하기'}/>

        </>
    )
}