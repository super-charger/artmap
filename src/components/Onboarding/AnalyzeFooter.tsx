import OnboardingLink from "@/components/Onboarding/OnboardingLink";
import OnboardingButton from "@/components/Onboarding/OnboardingButton";
import Link from "next/link";

export default function AnalyzeFooter() {
    return (
        <div className="absolute inset-x-0 bottom-4 flex flex-col items-center">
            <OnboardingButton bgColor={'black'} className="">취향분석 시작</OnboardingButton>
            <Link href={"/home/now"}
                  className="mt-4 relative text-center text-[#808080] text-base font-normal font-['Noto Sans KR'] underline leading-7">
                다음에 할래요
            </Link>
        </div>
    );
}
