import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import OnboardingTitle from "@/components/Onboarding/OnboardingTitle";
import GeneralProfile from "@/components/Onboarding/GeneralProfile";

export default function Page() {
    return (
        <>
            <OnboardingHeader backButton={true}/>
            <OnboardingTitle>프로필 정보를 입력하세요.</OnboardingTitle>
            <GeneralProfile/>
        </>
    )
}