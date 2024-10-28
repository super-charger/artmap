import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import OnboardingTitle from "@/components/Onboarding/OnboardingTitle";
import OnboardingUserType from "@/components/Onboarding/OnboardingUserType";

export default function Page() {
    return (
        <>
            <OnboardingHeader backButton={true}/>
            <OnboardingTitle>회원 종류를 선택하세요</OnboardingTitle>
            <OnboardingUserType/>
        </>
    )
}