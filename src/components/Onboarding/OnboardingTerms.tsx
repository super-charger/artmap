'use client'
import {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

export default function OnboardingTerms() {

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
        router.push('/onboarding/analyze');
    };
    const isButtonEnabled = isServiceChecked && isPrivacyChecked;

    return (
        <>
            <div
                className="left-[16px] relative flex-col justify-start items-start gap-10 inline-flex w-full mt-16">
                <div className="self-stretch flex-col justify-center items-start gap-5 flex w-11/12">
                    <div className="self-stretch flex-col justify-end items-start gap-2 flex w-full">
                        <div className="self-stretch justify-between items-center inline-flex w-full border-b-2 border-black pb-2">
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
                    <div className="self-stretch flex-col justify-center items-center flex w-full">
                        <div className="self-stretch py-[13px] justify-between items-center inline-flex w-full">
                            <div>
                    <span className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] underline leading-[18px]">
                        서비스 이용을 위한 필수약관 동의
                    </span>
                                <span
                                    className="text-[#7f20f7] text-xs font-normal font-['Noto Sans KR'] leading-[18px]"> (필수)</span>
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
                        <div className="self-stretch py-[13px] justify-between items-center inline-flex w-full">
                            <div>
                    <span className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] underline leading-[18px]">
                        개인정보수집 및 이용 동의
                    </span>
                                <span
                                    className="text-[#7f20f7] text-xs font-normal font-['Noto Sans KR'] leading-[18px]"> (필수)</span>
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
                        <div className="self-stretch py-[13px] justify-between items-center inline-flex w-full">
                            <div
                                className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] underline leading-[18px]">
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

            <div className='w-full justify-center flex absolute bottom-4'>
                <button
                    className={`w-[calc(100%-32px)] h-[50px] rounded-[5px] justify-center items-center inline-flex ${isButtonEnabled ? 'bg-[#1a1a1a]' : 'bg-[#bebebe]'}`}
                    disabled={!isButtonEnabled}
                    onClick={handleSubmit}
                >
                    <div className="text-white text-base font-bold font-['Noto Sans KR'] leading-7 flex">다음</div>
                </button>
            </div>
        </>
    )
}