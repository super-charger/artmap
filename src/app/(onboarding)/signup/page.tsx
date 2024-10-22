import Image from "next/image";

export default function Page() {
    return (
        <div className="w-[375px] h-[812px] relative bg-white">
            <div className="w-[375px] h-[30px] left-0 top-[782px] absolute">
                <div className="w-[375px] h-[30px] left-0 top-0 absolute bg-white"/>
                <div className="w-[130px] h-[5px] left-[122px] top-[20px] absolute bg-[#1a1a1a] rounded-sm"/>
            </div>
            <div
                className="left-[16px] top-[104px] absolute text-[#1a1a1a] text-xl font-bold font-['Noto Sans KR'] leading-[29px]">회원
                종류를 선택하세요
            </div>
            <div className="w-[375px] h-[60px] left-0 top-[44px] absolute">
                            <Image src="/icons/arrow/black-left.svg" alt={"arrow icon"} width={24} height={24} className="absolute left-[16px] top-[18px]"/>
            </div>
            <div
                className="w-[343px] h-[50px] px-[15px] left-[16px] top-[702px] absolute bg-[#bebebe] rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                <div className="text-white text-base font-bold font-['Noto Sans KR'] leading-7">다음</div>
            </div>
            <div className="w-[343px] h-[93px] left-[16px] top-[233px] absolute bg-white rounded-[10px] shadow"/>
            <div className="w-[343px] h-[93px] left-[16px] top-[346px] absolute bg-white rounded-[10px] shadow"/>
            <div className="w-[343px] h-[93px] left-[16px] top-[459px] absolute bg-white rounded-[10px] shadow"/>
            <div
                className="left-[98px] top-[256px] absolute text-[#1a1a1a] text-base font-bold font-['Noto Sans KR'] leading-7">일반
                회원
            </div>
            <div
                className="left-[98px] top-[369px] absolute text-[#1a1a1a] text-base font-bold font-['Noto Sans KR'] leading-7">작가
                회원
            </div>
            <div
                className="left-[98px] top-[482px] absolute text-[#1a1a1a] text-base font-bold font-['Noto Sans KR'] leading-7">전시관
                회원
            </div>
            <div className="w-9 h-9 left-[42px] top-[262px] absolute shadow">
                <div className="w-[24.60px] h-[25.05px] left-[4.95px] top-[4.50px] absolute">
                </div>
            </div>
            <div className="w-9 h-9 left-[42px] top-[375px] absolute shadow"/>
            <div className="w-9 h-9 left-[42px] top-[488px] absolute shadow"/>
            <div
                className="left-[98px] top-[284px] absolute text-[#808080] text-xs font-normal font-['Noto Sans KR'] leading-[18px]">취향에
                맞는 전시와 작품 정보를 모아보세요.
            </div>
            <div
                className="left-[98px] top-[397px] absolute text-[#808080] text-xs font-normal font-['Noto Sans KR'] leading-[18px]">작품
                및 전시 포트폴리오를 등록하세요.
            </div>
            <div
                className="left-[98px] top-[510px] absolute text-[#808080] text-xs font-normal font-['Noto Sans KR'] leading-[18px]">전시회를
                등록하고 전시관을 홍보하세요.
            </div>
        </div>
    )
}