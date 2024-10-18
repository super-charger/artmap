import { NextFont } from 'next/dist/compiled/@next/font'

// notoSansKR: "'__Noto_Sans_KR_75662f', '__Noto_Sans_KR_Fallback_75662f'"

export const mappingNextFontFamily = <T extends Record<string, NextFont>>(
  fonts: T,
): Record<keyof T, string> => {
  return Object.entries(fonts).reduce(
    (prev, curr) => {
      const [key, value] = curr
      return {
        ...prev,
        [key]: value.style.fontFamily,
      }
    },
    {} as Record<keyof T, string>,
  )
}
