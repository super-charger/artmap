'use client'
import Image from "next/image";
import {useEffect, useState} from "react";

export default function OnboardingImage() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);


    return (
        <>
        {isVisible && (
        <Image src={'/images/onboarding.png'} alt={"onboarding image"} width={600} height={0} className="h-full z-50 items-center justify-center flex absolute"/>
        )}
        </>
    )
}