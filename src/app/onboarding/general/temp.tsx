'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Temp() {
    const [nickname, setNickname] = useState<string>("");
    const router = useRouter();

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const handleNextClick = () => {
            router.push('/terms');
    };

    return (
        <>
            <div className="w-[375px] h-[812px] relative bg-white">
                <div
                    className="left-[16px] top-[104px] absolute text-[#1a1a1a] text-xl font-bold font-['Noto Sans KR'] leading-[29px]">프로필
                    정보를 입력하세요.
                </div>
                <div className="w-[375px] h-[60px] left-0 top-[44px] absolute">
                    <div className="w-6 h-6 left-[16px] top-[18px] absolute">
                        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute">
                            <div className="w-[16.05px] h-[13.55px] left-[1px] top-[2px] absolute">
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="left-[16px] top-[193px] absolute flex-col justify-start items-start gap-[43px] inline-flex">
                    <div className="flex-col justify-start items-start gap-[50px] flex">
                        <div className="w-[343px] h-[70px] relative">
                            <div className="w-[70px] h-[70px] left-[137px] top-0 absolute">
                                <Image src={"/icons/profile/profile-m.svg"} alt={"profile-m"} width={70} height={70}/>
                            </div>
                        </div>
                        <div className="h-[68px] flex-col justify-start items-start gap-2.5 flex">
                            <div
                                className="self-stretch text-black text-xs font-bold font-['Noto Sans KR'] leading-[18px]">닉네임
                            </div>
                            <div className="self-stretch h-10 flex-col justify-start items-start gap-px flex">
                                <div className="self-stretch h-[38px] justify-start items-center gap-2.5 inline-flex">
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={handleNicknameChange}
                                        className="self-stretch h-[38px] justify-start items-center gap-2.5 inline-flex text-[#1a1a1a] text-base font-normal font-['Noto Sans KR'] leading-7"
                                        placeholder="닉네임을 입력해 주세요."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className={`w-[343px] h-[50px] px-[15px] left-[16px] top-[702px] absolute rounded-[5px] justify-center items-center gap-2.5 inline-flex ${nickname ? 'bg-[#1a1a1a]' : 'bg-[#bebebe]'}`}
                    disabled={!nickname}
                    onClick={handleNextClick}>
                    <div className="text-white text-base font-bold font-['Noto Sans KR'] leading-7">다음</div>
                </button>
            </div>
        </>
    )
}