import Link from "next/link";
import Image from "next/image";
import NextAuthLoginButton from "@/components/Nextauth/NextAuthLoginButton";
import {auth} from "@/auth";
import NextKakao from "@/components/Nextauth/NextKakao";
import NextNaver from "@/components/Nextauth/NextNaver";
import NextFacebook from "@/components/Nextauth/NextFacebook";
import NextGoogle from "@/components/Nextauth/NextGoogle";
import NextApple from "@/components/Nextauth/NextApple";
import {redirect} from "next/navigation";

export default async function Page() {
    const session = await auth()
    if (session?.user) {
        redirect('/signup')
    }
    return (
        <>
            <div className="w-[375px] h-[812px] relative bg-white">
                <div
                    className="left-[46px] top-[382px] absolute text-center text-[#808080] text-base font-normal font-['Noto Sans KR'] leading-7">자동로그인
                </div>
                <div
                    className="left-[267px] top-[382px] absolute text-right text-[#808080] text-base font-normal font-['Noto Sans KR'] underline leading-7">비밀번호
                    찾기
                </div>
                <div
                    className="left-[158px] top-[602px] absolute text-center text-[#808080] text-base font-normal font-['Noto Sans KR'] underline leading-7">회원가입
                </div>
                <div
                    className="w-[343px] h-10 left-[16px] top-[322px] absolute flex-col justify-start items-start gap-px inline-flex">
                    <div className="self-stretch h-[38px] justify-start items-center gap-2.5 inline-flex">
                        <div className="w-6 h-6 relative">
                            <div className="w-5 h-[22.18px] left-[2px] top-[1px] absolute">
                            </div>
                        </div>
                        <div className="text-[#bebebe] text-base font-normal font-['Noto Sans KR'] leading-7">비밀번호</div>
                    </div>
                </div>
                <div
                    className="w-[343px] h-10 left-[16.42px] top-[242px] absolute flex-col justify-start items-start gap-px inline-flex">
                    <div className="self-stretch h-[38px] justify-start items-center gap-2.5 inline-flex">
                        <div className="w-6 h-6 relative">
                            <div className="w-[16.52px] h-[19.50px] left-[4.02px] top-[2px] absolute">
                            </div>
                        </div>
                        <div className="text-[#bebebe] text-base font-normal font-['Noto Sans KR'] leading-7">이메일</div>
                    </div>
                </div>
                <div
                    className="w-[343px] h-[50px] px-[15px] left-[16px] top-[532px] absolute bg-[#1a1a1a] rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-base font-bold font-['Noto Sans KR'] leading-7">로그인</div>
                </div>
                <div className="w-5 h-5 left-[16px] top-[386px] absolute">
                    <div className="w-5 h-5 left-0 top-0 absolute">
                    </div>
                </div>
                <div
                    className="left-[98px] top-[670px] absolute text-center text-[#808080] text-xs font-normal font-['Noto Sans KR'] leading-[18px]">소셜
                    계정으로 간편 로그인/회원가입
                </div>
                <div className="w-11 h-11 left-[37px] top-[707px] absolute">
                    <NextKakao/>
                </div>
                <div className="w-11 h-11 left-[101px] top-[708px] absolute">
                    <NextNaver/>
                </div>
                <div className="w-11 h-11 left-[165px] top-[708px] absolute">
                    <NextFacebook/>
                </div>
                <div className="w-11 h-11 left-[229px] top-[708px] absolute">
                    <NextGoogle/>
                </div>
                <div className="w-11 h-11 left-[293px] top-[708px] absolute">
                    <NextApple/>
                </div>
                <div
                    className="left-[152px] top-[104px] absolute text-center text-[#1a1a1a] text-[26px] font-bold font-['Noto Sans KR'] leading-[38px]">로그인
                </div>
            </div>
        </>
    )
}