import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import OnboardingTitle from "@/components/Onboarding/OnboardingTitle";
import OnboardingTerms from "@/components/Onboarding/OnboardingTerms";

export default function Page() {

    return (
        <>
            <OnboardingHeader backButton={true}/>
            <OnboardingTitle>이용약관에 동의해주세요.</OnboardingTitle>
            <OnboardingTerms/>

        </>
    )
}