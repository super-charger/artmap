'use client'
import Image from "next/image";
import {useEffect, useState} from "react";

export default function OnboardingImage() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 3초 후에 이미지를 숨기기
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        // 컴포넌트가 unmount 될 때 타이머를 정리
        return () => clearTimeout(timer);
    }, []);


    return (
        <>
        {isVisible && (
        <Image src={'/images/onboarding.png'} alt={"onboarding image"} width={600} height={0} className="h-full z-10 items-center justify-center flex absolute"/>
        )}
        </>
    )
}