'use client'

import { SystemFilterBlackIcon } from '@/generated/icons/MyIcons'
import { ButtonProps } from '@/types/button'

export const FilterIconBtn = (props: ButtonProps) => {
  return (
    <button className="ml-auto flex items-center" {...props}>
      <SystemFilterBlackIcon />
    </button>
  )
}
