import Image from 'next/image'
import Link from 'next/link'

import { UrlObject } from 'url'

interface SNSLinkButtonProps {
  service: 'kakao' | 'facebook' | 'instagram' | 'naver' | 'homepage'
  link?: string // 링크는 기본적으로 string 타입을 사용
}

const SNSLinkButton: React.FC<SNSLinkButtonProps> = ({
  service,
  link = '#',
}) => {
  // 이미지 경로 설정: 모든 링크 버튼은 link-button 폴더에 있음
  const imagePath = `/icons/sns/link-button/${service}-link-button.svg`

  return (
    <Link
      href={link as unknown as UrlObject}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={imagePath} width={40} height={40} alt={`${service} link`} />
    </Link>
  )
}

export default SNSLinkButton
