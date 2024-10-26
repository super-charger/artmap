import Image from "next/image";

type OnboardingHeaderProps = {
    backButton?: boolean;
}
export default function OnboardingHeader({backButton = false}: OnboardingHeaderProps) {
    if(backButton){
        return(
        <header className="w-full h-[60px]">
            <Image src="/icons/arrow/black-left.svg" alt={"arrow icon"} width={24} height={24} className="absolute left-[16px] top-[18px]"/>
        </header>
        )
    }
    return (
        <header className="w-full h-[60px]">
        </header>
    )
}