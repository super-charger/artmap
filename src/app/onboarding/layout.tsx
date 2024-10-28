import {ReactNode} from "react";
import OnboardingLayout from "@/components/Onboarding/OnboardingLayout";


export default async function Layout({
                                             children,
                                         }: {
    children: ReactNode
}) {
    return (
        <OnboardingLayout>
{children}
        </OnboardingLayout>
    )
}