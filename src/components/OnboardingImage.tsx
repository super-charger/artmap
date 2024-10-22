import Image from "next/image";

export default function OnboardingImage() {
    return (
        <Image src={'/images/onboarding.png'} alt={"onboarding image"} width={375} height={812}/>
    )
}