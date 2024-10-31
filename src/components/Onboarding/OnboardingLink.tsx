import Link from 'next/link'
import {UrlObject} from "url";

type onboardingLinkProps = {
  bgColor: 'gray' | 'black' | 'purple' | 'white'
  children: React.ReactNode
  href: string
}
export default function OnboardingLink({
  bgColor,
  children,
  href,
}: onboardingLinkProps) {
  let bgClass = ''
  let textColor = 'text-grayscale_white'
  if (bgColor === 'gray') {
    bgClass = 'bg-grayscale_gray3'
  } else if (bgColor === 'black') {
    bgClass = 'bg-grayscale_black'
  } else if (bgColor === 'purple') {
    bgClass = 'bg-point'
  } else if (bgColor === 'white') {
    bgClass = 'bg-white'
    textColor = 'text-grayscale_black'
  }
  const link = new URL(href,`${process.env.NEXT_PUBLIC_BASE_URL}`)

  return (
    <Link
      href={link}
      className={`${bgClass} relative z-20 inline-flex h-[50px] w-11/12 items-center justify-center rounded-[5px] px-[15px] hover:opacity-75`}
    >
      <div
        className={`${textColor} font-['Noto Sans KR'] z-20 text-base font-bold leading-7`}
      >
        {children}
      </div>
    </Link>
  )
}
