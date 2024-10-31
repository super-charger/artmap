'use client'

import { PropsWithChildren } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { VerticalArrowOpenSIcon } from '@/generated/icons/MyIcons'

import { REVERSE_AREA_NAME_MAP } from '../../constants/map'
import { useCurrentArea } from '../../hooks/\buseCurrentArea'
import { useMapFilter } from '../../hooks/useMapFilter'

export default function LocationSettingSeet({
  children,
  ...props
}: PropsWithChildren) {
  // 필터 쿼리 파라미터
  const {
    queryParams: { area },
  } = useMapFilter()

  // // 현재 지도 중심점에서 가장 가까운 지역
  const currentArea = useCurrentArea()

  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <button className="flex gap-0.5 p-0">
          <p className="mobile-title-small">
            {REVERSE_AREA_NAME_MAP[area] ?? REVERSE_AREA_NAME_MAP[currentArea]}
          </p>
          <VerticalArrowOpenSIcon />
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        aria-describedby={undefined}
        className="m-auto max-w-screen-sm p-4 pt-5"
        buttonPosition="left"
      >
        <SheetHeader className="mobile-title mt-[6px] items-center rounded-t-md">
          <SheetTitle>위치 설정</SheetTitle>
          <SheetDescription className="sr-only">
            위치를 설정할 수 있습니다.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
