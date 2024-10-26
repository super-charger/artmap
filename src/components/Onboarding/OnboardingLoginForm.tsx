'use client';
import Image from "next/image";

export default function OnboardingLoginForm() {
    return (
        <>
            <form className="h-[388px] m-[16px]">
                <div className="flex items-center h-[40px] mb-10 border-b-2 border-grayscale_black">
                    <label htmlFor="email" className="flex-shrink-0">
                        <Image src={"/icons/login/id.svg"} alt={"id 아이콘"} height={24} width={24} className="mr-2"/>
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="이메일"
                        className="flex-grow text-[#bebebe] text-base font-normal font-['Noto Sans KR'] leading-7"
                    />
                </div>
                <div className="flex items-center h-[40px] border-b-2 border-grayscale_black">
                    <label htmlFor="password" className="flex-shrink-0">
                        <Image src={"/icons/login/password.svg"} alt={"password 아이콘"} height={24} width={24}
                               className="mr-2"/>
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호 입력"
                        className="flex-grow text-[#bebebe] text-base font-normal font-['Noto Sans KR'] leading-7"
                    />
                </div>
                <div className="flex h-[28px] mt-[25px] items-center">
                    <input type="checkbox" className="w-[19px] h-[19px] mr-[10px]"/>
                    <div
                        className="text-center text-[#808080] text-base font-normal font-['Noto Sans KR'] leading-7">자동로그인
                    </div>
                    <div
                        className="ml-auto text-right text-[#808080] text-base font-normal font-['Noto Sans KR'] underline leading-7">비밀번호
                        찾기
                    </div>
                </div>
            </form>
        </>
    );
}