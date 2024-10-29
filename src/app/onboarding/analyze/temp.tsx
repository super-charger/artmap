import Image from "next/image";
import Link from "next/link";

export default function Temp() {
    return (
        <>
                <div className="w-[97px] h-4 left-[69px] top-[124px] absolute bg-[#e5d7f8]"/>
                <div className="left-[16px] top-[104px] absolute"><span
                    className="text-[#1a1a1a] text-[26px] font-normal font-['Noto Sans KR'] leading-[38px]">지금 </span><span
                    className="text-[#7f20f7] text-[26px] font-bold font-['Noto Sans KR'] leading-[38px]">취향분석</span><span
                    className="text-[#1a1a1a] text-[26px] font-normal font-['Noto Sans KR'] leading-[38px]">을 통해<br/></span><span
                    className="text-[#1a1a1a] text-[26px] font-bold font-['Noto Sans KR'] leading-[38px]">나에게 딱 맞는 <br/>전시 추천</span><span
                    className="text-[#1a1a1a] text-[26px] font-normal font-['Noto Sans KR'] leading-[38px]">을 받아보세요.</span>
                </div>
                <Link href={"/home/now"}
                    className="left-[141px] top-[744px] absolute text-center text-[#808080] text-base font-normal font-['Noto Sans KR'] underline leading-7">다음에
                    할래요
                </Link>
                <Link href={"/onboarding/analyze2"}
                    className="w-[343px] h-[50px] px-[15px] left-[16px] top-[674px] absolute bg-black rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-base font-bold font-['Noto Sans KR'] leading-7">취향분석 시작</div>
                </Link>
                <Image className="left-[16px] top-[261px] absolute"
                     src="/images/analyze.png" width={343} height={320} alt={"analyze"}/>
        </>
    )
}