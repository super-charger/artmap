'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Page() {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isServiceChecked, setIsServiceChecked] = useState(false);
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const [isMarketingChecked, setIsMarketingChecked] = useState(false);
    const router = useRouter();

    const handleAllCheckboxClick = () => {
        const newCheckedState = !isAllChecked;
        setIsAllChecked(newCheckedState);
        setIsServiceChecked(newCheckedState);
        setIsPrivacyChecked(newCheckedState);
        setIsMarketingChecked(newCheckedState);
    };

    const handleServiceCheckboxClick = () => {
        setIsServiceChecked(!isServiceChecked);
    };

    const handlePrivacyCheckboxClick = () => {
        setIsPrivacyChecked(!isPrivacyChecked);
    };

    const handleMarketingCheckboxClick = () => {
        setIsMarketingChecked(!isMarketingChecked);
    };

    const handleSubmit = () => {
            router.push('/analyze');
    };

    const isButtonEnabled = isServiceChecked && isPrivacyChecked;

    return (
        <>
            <div className="w-[375px] h-[812px] relative bg-white">
                <div className="left-[16px] top-[104px] absolute text-[#1a1a1a] text-xl font-bold font-['Noto Sans KR'] leading-[29px]">
                    이용약관에 동의해주세요.
                </div>
                <div className="w-[375px] h-[60px] left-0 top-[44px] absolute">
                    <div className="w-6 h-6 left-[16px] top-[18px] absolute">
                        {/* 뒤로가기 자리 */}
                    </div>
                </div>
                <button
                    className={`w-[343px] h-[50px] px-[15px] left-[16px] top-[702px] absolute rounded-[5px] justify-center items-center gap-2.5 inline-flex ${isButtonEnabled ? 'bg-[#1a1a1a]' : 'bg-[#bebebe]'}`}
                    disabled={!isButtonEnabled}
                    onClick={handleSubmit}
                >
                    <div className="text-white text-base font-bold font-['Noto Sans KR'] leading-7">가입완료</div>
                </button>
                <div className="h-[210px] left-[16px] top-[193px] absolute flex-col justify-start items-start gap-10 inline-flex">
                    <div className="self-stretch h-[210px] flex-col justify-center items-start gap-5 flex">
                        <div className="self-stretch h-10 flex-col justify-end items-start gap-2 flex">
                            <div className="self-stretch justify-between items-center inline-flex w-[343px]">
                                <div className="text-black text-base font-bold font-['Noto Sans KR'] leading-7">
                                    아래 약관에 모두 동의합니다.
                                </div>
                                <div className="w-6 h-6 relative cursor-pointer" onClick={handleAllCheckboxClick}>
                                    <Image
                                        src={isAllChecked ? '/icons/check-box/circle-check-on.svg' : '/icons/check-box/circle-check-off.svg'}
                                        alt={isAllChecked ? "circle-check-on" : "circle-check-off"}
                                        className="absolute right-0"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch h-[150px] flex-col justify-center items-center flex">
                            <div className="self-stretch h-[50px] py-[13px] justify-between items-center inline-flex">
                                <div>
                                    <span className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] underline leading-[18px]">
                                        서비스 이용을 위한 필수약관 동의
                                    </span>
                                    <span className="text-[#7f20f7] text-xs font-normal font-['Noto Sans KR'] leading-[18px]"> (필수)</span>
                                </div>
                                <div className="w-6 h-6 relative cursor-pointer" onClick={handleServiceCheckboxClick}>
                                    <Image
                                        src={isServiceChecked ? '/icons/check-box/check-line-on.svg' : '/icons/check-box/check-line-off.svg'}
                                        alt={isServiceChecked ? "check-line-on" : "check-line-off"}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </div>
                            <div className="self-stretch h-[50px] py-[13px] justify-between items-center inline-flex">
                                <div>
                                    <span className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] underline leading-[18px]">
                                        개인정보수집 및 이용 동의
                                    </span>
                                    <span className="text-[#7f20f7] text-xs font-normal font-['Noto Sans KR'] leading-[18px]"> (필수)</span>
                                </div>
                                <div className="w-6 h-6 relative cursor-pointer" onClick={handlePrivacyCheckboxClick}>
                                    <Image
                                        src={isPrivacyChecked ? '/icons/check-box/check-line-on.svg' : '/icons/check-box/check-line-off.svg'}
                                        alt={isPrivacyChecked ? "check-line-on" : "check-line-off"}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </div>
                            <div className="self-stretch h-[50px] py-[13px] justify-between items-center inline-flex">
                                <div className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] underline leading-[18px]">
                                    마케팅 수신 동의
                                </div>
                                <div className="w-6 h-6 relative cursor-pointer" onClick={handleMarketingCheckboxClick}>
                                    <Image
                                        src={isMarketingChecked ? '/icons/check-box/check-line-on.svg' : '/icons/check-box/check-line-off.svg'}
                                        alt={isMarketingChecked ? "check-line-on" : "check-line-off"}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
