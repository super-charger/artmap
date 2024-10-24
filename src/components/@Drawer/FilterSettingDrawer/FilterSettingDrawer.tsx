'use client'

import { PropsWithChildren } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { FilterIconBtn } from './components/FilterIconBtn'

export const FilterSettingDrawer = ({
  children,
  ...props
}: PropsWithChildren) => {
  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <FilterIconBtn />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="m-auto max-w-screen-sm rounded-t-[10px] p-0"
      >
        <SheetHeader className="flex items-center border-b-[1px] border-grayscale_gray2 pb-[16px] pt-[20px]">
          <SheetTitle>필터 설정</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
