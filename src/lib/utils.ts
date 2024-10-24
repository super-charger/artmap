import { type ClassValue, clsx } from 'clsx'
import { DefaultClassGroupIds, extendTailwindMerge } from 'tailwind-merge'

import { textStyles } from '@/generated/tokens/text-styles'

//  각 키의 첫 번째 문자(점)를 제거
const textStyleKeys = Object.keys(textStyles).map((key) => key.slice(1))

type ExtendedClassGroupIds = DefaultClassGroupIds | 'text-presets'

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'text-presets': textStyleKeys,
    } as Partial<Record<ExtendedClassGroupIds, string[]>>,
  },
})

export function cn(...args: ClassValue[]) {
  return customTwMerge(clsx(...args))
}
