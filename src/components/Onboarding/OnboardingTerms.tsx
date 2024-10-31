'use client'
import {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

type CheckboxesState = {
    isAllChecked: boolean;
    isServiceChecked: boolean;
    isPrivacyChecked: boolean;
    isMarketingChecked: boolean;
};

export default function OnboardingTerms() {
    const [checkboxes, setCheckboxes] = useState<CheckboxesState>({
        isAllChecked: false,
        isServiceChecked: false,
        isPrivacyChecked: false,
        isMarketingChecked: false,
    });
    const router = useRouter();

    const handleAllCheckboxClick = () => {
        const newCheckedState = !checkboxes.isAllChecked;
        setCheckboxes({
            isAllChecked: newCheckedState,
            isServiceChecked: newCheckedState,
            isPrivacyChecked: newCheckedState,
            isMarketingChecked: newCheckedState,
        });
    };

    const handleCheckboxClick = (key: keyof CheckboxesState) => {
        setCheckboxes(prevState => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const handleSubmit = () => {
        router.push('/onboarding/analyze');
    };

    const isButtonEnabled = checkboxes.isServiceChecked && checkboxes.isPrivacyChecked;

    return (
        <>
            <div className="left-[16px] relative flex-col justify-start items-start gap-10 inline-flex w-full mt-16">
                <div className="self-stretch flex-col justify-center items-start gap-5 flex w-11/12">
                    <div className="self-stretch flex-col justify-end items-start gap-2 flex w-full">
                        <div className="self-stretch justify-between items-center inline-flex w-full border-b-2 border-black pb-2">
                            <div className="text-black text-base font-bold font-['Noto Sans KR'] leading-7">
                                아래 약관에 모두 동의합니다.
                            </div>
                            <div className="w-6 h-6 relative cursor-pointer" onClick={handleAllCheckboxClick}>
                                <Image
                                    src={checkboxes.isAllChecked ? '/icons/check-box/circle-check-on.svg' : '/icons/check-box/circle-check-off.svg'}
                                    alt={checkboxes.isAllChecked ? "circle-check-on" : "circle-check-off"}
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
                                <span className="text-[#7f20f7] text-xs font-normal font-['Noto Sans KR'] leading-[18px]"> (필수)</span>
                            </div>
                            <div className="w-6 h-6 relative cursor-pointer" onClick={() => handleCheckboxClick('isServiceChecked')}>
                                <Image
                                    src={checkboxes.isServiceChecked ? '/icons/check-box/check-line-on.svg' : '/icons/check-box/check-line-off.svg'}
                                    alt={checkboxes.isServiceChecked ? "check-line-on" : "check-line-off"}
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
                                <span className="text-[#7f20f7] text-xs font-normal font-['Noto Sans KR'] leading-[18px]"> (필수)</span>
                            </div>
                            <div className="w-6 h-6 relative cursor-pointer" onClick={() => handleCheckboxClick('isPrivacyChecked')}>
                                <Image
                                    src={checkboxes.isPrivacyChecked ? '/icons/check-box/check-line-on.svg' : '/icons/check-box/check-line-off.svg'}
                                    alt={checkboxes.isPrivacyChecked ? "check-line-on" : "check-line-off"}
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>
                        <div className="self-stretch py-[13px] justify-between items-center inline-flex w-full">
                            <div className="text-[#808080] text-xs font-normal font-['Noto Sans KR'] underline leading-[18px]">
                                마케팅 수신 동의
                            </div>
                            <div className="w-6 h-6 relative cursor-pointer" onClick={() => handleCheckboxClick('isMarketingChecked')}>
                                <Image
                                    src={checkboxes.isMarketingChecked ? '/icons/check-box/check-line-on.svg' : '/icons/check-box/check-line-off.svg'}
                                    alt={checkboxes.isMarketingChecked ? "check-line-on" : "check-line-off"}
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