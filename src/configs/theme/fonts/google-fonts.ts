import { Noto_Sans_KR } from 'next/font/google'

export const notoSansKR = Noto_Sans_KR({
  weight: ['300', '400', '600', '700', '800', '900'],
  preload: false, // 한글을 지원하는 폰트라면 preload를 false로 설정합니다.
  variable: '--font-noto-sans-kr',
})
