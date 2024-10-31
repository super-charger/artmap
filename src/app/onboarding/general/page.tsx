import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import OnboardingTitle from "@/components/Onboarding/OnboardingTitle";
import GeneralProfile from "@/components/Onboarding/GeneralProfile";
import {auth} from "@/auth";

export default async function Page() {
    const session = await auth();
    let profileImage: string | null | undefined ;
    if (session?.user && typeof session.user.image === 'string') {
        profileImage = session.user.image;
    } else {
        profileImage = undefined;
    }
    return (
        <>
            <OnboardingHeader backButton={true}/>
            <OnboardingTitle>프로필 정보를 입력하세요.</OnboardingTitle>
            <GeneralProfile profileImage={profileImage}/>
        </>
    )
}