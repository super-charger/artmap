'use client'

import { PropsWithChildren, useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { VerticalArrowOpenSIcon } from '@/generated/icons/MyIcons'

export default function LocationSettingDrawer({
  children,
  ...props
}: PropsWithChildren) {
  const [location, setLocation] = useState('서울특별시 마포구')

  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <button className="flex gap-0.5 p-0">
          <p className="mobile-title-small">{location}</p>
          <VerticalArrowOpenSIcon />
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="m-auto max-w-screen-sm p-4 pt-5"
        buttonPosition="left"
      >
        <SheetHeader className="mobile-title mt-[6px] items-center rounded-t-md">
          <SheetTitle>위치 설정</SheetTitle>
        </SheetHeader>
        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
