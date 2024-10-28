type OnboardingTitleProps = {
    children: React.ReactNode;
}
export default function OnboardingTitle({children}: OnboardingTitleProps) {
    return (
        <>
            <div className="text-[#1a1a1a] text-xl font-bold font-['Noto Sans KR'] leading-[29px] ml-[16px]">{children}</div>
        </>
    )
}