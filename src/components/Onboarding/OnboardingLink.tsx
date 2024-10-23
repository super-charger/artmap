import Link from "next/link";

type onboardingLinkProps = {
    bgColor: string;
    children: React.ReactNode;
    href: string;
}
export default function OnboardingLink({bgColor, children,href}: onboardingLinkProps) {
    let bgClass = '';
    let textColor = 'text-grayscale_white';
    if (bgColor === 'gray') {
        bgClass = 'bg-grayscale_gray3';
    } else if (bgColor === 'black') {
        bgClass = 'bg-grayscale_black';
    } else if (bgColor === 'purple') {
        bgClass = 'bg-point';
    } else if (bgColor === 'white') {
        bgClass = 'bg-white';
        textColor = 'text-grayscale_black';
    }

    return (
        <Link href={href}
            className={`${bgClass} w-11/12 h-[50px] px-[15px] rounded-[5px] justify-center items-center inline-flex z-20 relative hover:opacity-75`}>
            <div className={`${textColor} text-base font-bold font-['Noto Sans KR'] leading-7 z-20`}>
                {children}
            </div>
        </Link>
    )
}