'use client'
import OnboardingLink from "@/components/Onboarding/OnboardingLink";
import OnboardingButton from "@/components/Onboarding/OnboardingButton";
import Link from "next/link";

type AnalyzeFooterProps = {
    onClick?: () => void;
    buttonText: string;
    nextButton: string;
}
export default function AnalyzeFooter({onClick, buttonText,nextButton}: AnalyzeFooterProps) {
    return (
        <div className="absolute inset-x-0 bottom-4 flex flex-col items-center">
            <OnboardingButton bgColor={'black'} onClick={onClick}>{buttonText}</OnboardingButton>
            <Link href={"/home/now"}
                  className="mt-4 relative text-center text-[#808080] text-base font-normal font-['Noto Sans KR'] underline leading-7">
                {nextButton}
            </Link>
        </div>
    );
}
