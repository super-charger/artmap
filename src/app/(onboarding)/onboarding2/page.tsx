import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="w-[375px] h-[812px] relative bg-white">
                <img className="w-[729px] h-[812px] left-[-103px] top-0 absolute"
                     src="https://via.placeholder.com/729x812"/>
                <div className="w-[375px] h-[812px] left-0 top-0 absolute">
                    <img className="w-[375px] h-[812px] left-0 top-0 absolute"
                         src="https://via.placeholder.com/375x812"/>
                </div>
                <div className="w-[375px] h-[812px] left-0 top-0 absolute bg-gradient-to-b from-white to-[#89898a]"/>
                <div
                    className="left-[16px] top-[242px] absolute text-[#808080] text-base font-normal font-['Noto Sans KR'] leading-7">나와
                    가장 가까운 전시 정보
                </div>
                <div className="w-[375px] h-[30px] left-0 top-[782px] absolute">
                    <div className="w-[130px] h-[5px] left-[122px] top-[20px] absolute bg-[#1a1a1a] rounded-sm"/>
                </div>
                <Link
                    href="/signup"
                    className="w-[343px] h-[50px] px-[15px] left-[16px] top-[632px] absolute bg-[#7f20f7] rounded-[5px] shadow justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-base font-bold font-['Noto Sans KR'] leading-7">아트맵 회원가입</div>
                </Link>
                <div
                    className="w-[290px] left-[16px] top-[127px] absolute text-[#1a1a1a] text-[40px] font-bold font-['Noto Sans KR'] leading-[50px]">Art
                    is <br/>Every where
                </div>
                <Link
                    href="/login2"
                    className="w-[343px] h-[50px] px-[15px] left-[16px] top-[702px] absolute bg-white rounded-[5px] shadow justify-center items-center gap-2.5 inline-flex">
                    <div className="text-[#1a1a1a] text-base font-bold font-['Noto Sans KR'] leading-7">로그인</div>
                </Link>
            </div>
        </>
    )
}