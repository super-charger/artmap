'use client'
import {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

export default function OnboardingUserType() {
    const [selectedMemberType, setSelectedMemberType] = useState<string | null>(null);
    const router = useRouter();

    const handleMemberTypeClick = (type: string) => {
        setSelectedMemberType(type);
    };

    const handleNextClick = () => {
        if (selectedMemberType) {
            const route = selectedMemberType === 'general' ? '/general' : selectedMemberType === 'artist' ? '/artist' : '/gallery';
            router.push(route);
        }
    };
    return (
        <div className="w-full h-full bg-white flex flex-col">
            <div className='flex flex-col w-full items-center py-64 gap-5'>
                <button
                    className={`w-[calc(100%-32px)] h-[93px] rounded-[10px] shadow-xl border border-solid ${selectedMemberType === 'general' ? 'border-2 border-[#7f20f7]' : 'bg-white'}`}
                    onClick={() => handleMemberTypeClick('general')}>
                    <Image src={'/icons/content/basic-36.svg'} alt={'basic-36'} width={36} height={36} className='absolute ml-10'/>
                    <p className="text-[#1a1a1a] text-base font-bold font-['Noto Sans KR'] leading-7">일반 회원</p>
                    <div className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] leading-[18px]">취향에 맞는 전시와
                        작품 정보를 모아보세요.
                    </div>
                </button>
                <button
                    className={`w-[calc(100%-32px)] h-[93px] rounded-[10px] shadow-xl border ${selectedMemberType === 'artist' ? 'border-2 border-[#7f20f7]' : 'bg-white'}`}
                    onClick={() => handleMemberTypeClick('artist')}>
                    <Image src={'/icons/content/artist-36.svg'} alt={'basic-36'} width={36} height={36} className='absolute ml-10'/>
                    <p className="text-[#1a1a1a] text-base font-bold font-['Noto Sans KR'] leading-7">작가 회원</p>
                    <div className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] leading-[18px]">작품 및 전시
                        포트폴리오를 등록하세요.
                    </div>
                </button>
                <button
                    className={`w-[calc(100%-32px)] h-[93px] rounded-[10px] shadow-xl border ${selectedMemberType === 'gallery' ? 'border-2 border-[#7f20f7]' : 'bg-white'}`}
                    onClick={() => handleMemberTypeClick('gallery')}>
                    <Image src={'/icons/content/gallery-36.svg'} alt={'basic-36'} width={36} height={36} className='absolute ml-10'/>
                    <p className="text-[#1a1a1a] text-base font-bold font-['Noto Sans KR'] leading-7">전시관 회원</p>
                    <div className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] leading-[18px]">전시회를 등록하고
                        전시관을 홍보하세요.
                    </div>
                </button>
            </div>
            <div className='w-full justify-center flex absolute bottom-1'>
                <button
                    className={`w-[calc(100%-32px)] h-[50px] rounded-[5px] justify-center items-center inline-flex ${selectedMemberType ? 'bg-[#1a1a1a]' : 'bg-[#bebebe]'}`}
                    disabled={!selectedMemberType}
                    onClick={handleNextClick}>
                    <div className="text-white text-base font-bold font-['Noto Sans KR'] leading-7 flex">다음</div>
                </button>
            </div>
        </div>
    )
}
