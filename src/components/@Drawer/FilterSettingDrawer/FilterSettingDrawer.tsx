'use client'

import SystemMarginBottom from '@/components/SystemMarginBottom'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { FilterBtn } from './components/FilterBtn'

type FilterSettingDrawerProps = {
  body?: React.ReactNode
  footer?: React.ReactNode
}

export const FilterSettingDrawer = ({
  body,
  footer,
  ...props
}: FilterSettingDrawerProps) => {
  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <FilterBtn />
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-[10px] p-0">
        <SheetHeader className="flex items-center border-b-[1px] border-grayscale_gray2 pb-[16px] pt-[20px]">
          <SheetTitle>필터 설정</SheetTitle>
        </SheetHeader>
        <div className="px-[16px]">{body}</div>
        <>{footer}</>
      </SheetContent>
    </Sheet>
  )
}
