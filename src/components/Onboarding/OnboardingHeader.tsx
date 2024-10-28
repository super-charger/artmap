'use client'
import Image from "next/image";
import {useRouter} from "next/navigation";

type OnboardingHeaderProps = {
    backButton?: boolean;
}
export default function OnboardingHeader({backButton = false}: OnboardingHeaderProps) {
    const router = useRouter();
    const onBackClick = () => {
        router.back();
    }

    if(backButton){
        return (
            <header className="w-full h-[60px]">
                <button onClick={onBackClick} className="absolute left-[16px] top-[18px]">
                    <Image src="/icons/arrow/black-left.svg" alt="arrow icon" width={24} height={24}/>
                </button>
            </header>
        )
    }
    return (
        <header className="w-full h-[60px]">
        </header>
    )
}