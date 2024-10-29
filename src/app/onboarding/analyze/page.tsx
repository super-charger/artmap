import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import Link from "next/link";
import Image from "next/image";
import OnboardingLink from "@/components/Onboarding/OnboardingLink";
import AnalyzeFooter from "@/components/Onboarding/AnalyzeFooter";

export default function Page() {
    return (
        <>
            <OnboardingHeader/>
            <div className="w-[97px] h-4 left-[69px] top-[138px] relative bg-[#e5d7f8]"/>
            <div className="left-[16px] top-[104px] relative"><span
                className="text-[#1a1a1a] text-[26px] font-normal font-['Noto Sans KR'] leading-[38px]">지금 </span><span
                className="text-[#7f20f7] text-[26px] font-bold font-['Noto Sans KR'] leading-[38px]">취향분석</span><span
                className="text-[#1a1a1a] text-[26px] font-normal font-['Noto Sans KR'] leading-[38px]">을 통해<br/></span><span
                className="text-[#1a1a1a] text-[26px] font-bold font-['Noto Sans KR'] leading-[38px]">나에게 딱 맞는 <br/>전시 추천</span><span
                className="text-[#1a1a1a] text-[26px] font-normal font-['Noto Sans KR'] leading-[38px]">을 받아보세요.</span>
            </div>
            <div className="flex flex-col items-center justify-between w-full mt-40">
                <Image className="relative"
                       src="/images/analyze.png" width={343} height={320} alt={"analyze"}/>
            </div>
            <AnalyzeFooter/>
        </>
    )
}