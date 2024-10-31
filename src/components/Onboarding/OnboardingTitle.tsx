type OnboardingTitleProps = {
    children: React.ReactNode;
}
export default function OnboardingTitle({children}: OnboardingTitleProps) {
    return (
        <>
            <div className="text-[#1a1a1a] text-3xl font-bold font-['Noto Sans KR'] leading-10 ml-[16px]">{children}</div>
        </>
    )
}