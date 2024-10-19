import Image from 'next/image'
import Link from 'next/link'

import { UrlObject } from 'url'

interface SNSLoginButtonProps {
  service: 'kakao' | 'facebook' | 'google' | 'naver' | 'apple'
  link?: UrlObject
}

const SNSLoginButton: React.FC<SNSLoginButtonProps> = ({
  service,
  link = '#',
}) => {
  // 경로 설정: 모든 로그인 버튼은 login 폴더에 있음
  const imagePath = `/icons/sns/login/${service}-login.svg`

  return (
    <Link
      href={link as unknown as UrlObject}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={imagePath} width="44" height="44" alt="" />
    </Link>
  )
}

export default SNSLoginButton
