'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Page() {
    const [selectedMemberType, setSelectedMemberType] = useState<string | null>(null);
    const router = useRouter();

    const handleMemberTypeClick = (type: string) => {
        setSelectedMemberType(type);
    };

    const handleNextClick = () => {
        if (selectedMemberType) {
            const route:any  = selectedMemberType === 'general' ? '/general' : selectedMemberType === 'artist' ? '/artist' : '/gallery';
            router.push(route);
        }
    };

    return (
        <div className="w-[375px] h-[812px] relative bg-white">
            <div
                className="left-[16px] top-[104px] absolute text-[#1a1a1a] text-xl font-bold font-['Noto Sans KR'] leading-[29px]">회원
                종류를 선택하세요
            </div>
            <div className="w-[375px] h-[60px] left-0 top-[44px] absolute">
                <Image src="/icons/arrow/black-left.svg" alt={"arrow icon"} width={24} height={24} className="absolute left-[16px] top-[18px]"/>
            </div>
            <button
                className={`w-[343px] h-[50px] px-[15px] left-[16px] top-[702px] absolute rounded-[5px] justify-center items-center gap-2.5 inline-flex ${selectedMemberType ? 'bg-[#1a1a1a]' : 'bg-[#bebebe]'}`}
                disabled={!selectedMemberType}
                onClick={handleNextClick}>
                <div className="text-white text-base font-bold font-['Noto Sans KR'] leading-7">다음</div>
            </button>
            <button
                className={`w-[343px] h-[93px] left-[16px] top-[233px] absolute rounded-[10px] shadow ${selectedMemberType === 'general' ? 'border-2 border-[#7f20f7]' : 'bg-white'}`}
                onClick={() => handleMemberTypeClick('general')}>
                <p className="text-[#1a1a1a] text-base font-bold font-['Noto Sans KR'] leading-7">일반 회원</p>
                <div className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] leading-[18px]">취향에 맞는 전시와 작품 정보를 모아보세요.</div>
            </button>
            <button
                className={`w-[343px] h-[93px] left-[16px] top-[346px] absolute rounded-[10px] shadow ${selectedMemberType === 'artist' ? 'border-2 border-[#7f20f7]' : 'bg-white'}`}
                onClick={() => handleMemberTypeClick('artist')}>
                <p className="text-[#1a1a1a] text-base font-bold font-['Noto Sans KR'] leading-7">작가 회원</p>
                <div className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] leading-[18px]">작품 및 전시 포트폴리오를 등록하세요.</div>
            </button>
            <button
                className={`w-[343px] h-[93px] left-[16px] top-[459px] absolute rounded-[10px] shadow ${selectedMemberType === 'gallery' ? 'border-2 border-[#7f20f7]' : 'bg-white'}`}
                onClick={() => handleMemberTypeClick('gallery')}>
                <p className="text-[#1a1a1a] text-base font-bold font-['Noto Sans KR'] leading-7">전시관 회원</p>
                <div className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] leading-[18px]">전시회를 등록하고 전시관을 홍보하세요.</div>
            </button>
        </div>
    )
}