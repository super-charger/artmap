'use client'
import {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

type GeneralProfileProps = {
    profileImage: string | null | undefined;
}
export default function GeneralProfile({profileImage}: GeneralProfileProps) {
    const [nickname, setNickname] = useState<string>("");
    const router = useRouter();

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const handleNextClick = () => {
        router.push('/onboarding/terms');
    };

    return (
        <div className="w-full h-full bg-white flex flex-col">
            <div className="absolute flex-col items-start justify-center w-full mt-[60px]">
                <div className="flex-col flex">
                    <div className="h-[100px] relative flex items-center justify-center">
                        <div className="w-[100px] h-[100px] relative overflow-hidden rounded-full">
                            <Image
                                src={typeof profileImage === 'string' ? profileImage : '/icons/profile/profile-m.svg'}
                                alt={"profile-m"}
                                fill={true}
                                className='object-cover'
                            />
                        </div>
                    </div>
                    <div className="flex-col flex items-start gap-2.5 m-[16px] mt-12">
                        <div className="text-black text-xs font-bold font-['Noto Sans KR'] leading-[18px]">닉네임</div>
                        <div className="flex-grow h-10 flex items-center border-b-4">
                            <input
                                type="text"
                                value={nickname}
                                onChange={handleNicknameChange}
                                className="self-stretch h-[38px] text-[#1a1a1a] text-base font-normal font-['Noto Sans KR'] leading-7"
                                placeholder="닉네임을 입력해 주세요."
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full justify-center flex absolute bottom-4'>
                <button
                    className={`w-[calc(100%-32px)] h-[50px] rounded-[5px] justify-center items-center inline-flex ${nickname ? 'bg-[#1a1a1a]' : 'bg-[#bebebe]'}`}
                    disabled={!nickname}
                    onClick={handleNextClick}>
                    <div className="text-white text-base font-bold font-['Noto Sans KR'] leading-7 flex">다음</div>
                </button>
            </div>
        </div>
    )
}