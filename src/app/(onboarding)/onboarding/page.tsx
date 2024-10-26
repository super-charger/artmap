import OnboardingImage from "@/components/Onboarding/OnboardingImage";
import OnboardingHeader from "@/components/Onboarding/OnboardingHeader";
import OnboardingLink from "@/components/Onboarding/OnboardingLink";

export default function Page() {
    return (
        <>
            {/*이미지가 보이기 전에 온보딩 페이지가 깜빡거리는 현상 있음*/}
            {/*<OnboardingImage />*/}
            <OnboardingHeader />
            <div className="relative w-full h-screen">
                {/* 배경 이미지와 그라데이션 결합 */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('/images/background-img/back-img1.png')" }}>
                </div>
                {/* 그라데이션 div를 배경 이미지 위에 배치 */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-[#8A8A8A] z-10"></div>
                <div
                    className="relative z-20 w-[290px] h-[100px] mt-10 ml-10 text-[#1a1a1a] text-[40px] font-bold font-['Noto Sans KR'] leading-[50px]">
                    Art is <br /> Every where
                </div>
                <div
                    className="relative z-20 text-[#808080] text-base font-normal font-['Noto Sans KR'] leading-7 ml-10 mt-5">
                    나와 가장 가까운 전시 정보
                </div>
                <div className="absolute bottom-32 w-full flex flex-col items-center gap-5">
                    <OnboardingLink bgColor={"purple"} href={"/aaaaaaaaaaaaaaa"}>
                        아트맵 회원가입
                    </OnboardingLink>
                    <OnboardingLink bgColor={"white"} href={"/login2"}>
                        로그인
                    </OnboardingLink>
                </div>
            </div>
        </>
    );
}
