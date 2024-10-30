'use client'

import { PropsWithChildren, useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { VerticalArrowOpenSIcon } from '@/generated/icons/MyIcons'

// 1. URL 상태 관리를 위한 훅 추가
export const useLocationState = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentCity = searchParams.get('city') ?? '서울특별시'

  const updateCity = useCallback(
    (newCity: string) => {
      const params = new URLSearchParams(searchParams)
      params.set('city', newCity)
      router.replace(`${pathname}?${params.toString()}` as any, {
        scroll: false,
      })
    },
    [pathname, router, searchParams],
  )

  return { currentCity, updateCity }
}

export default function LocationSettingSeet({
  children,
  ...props
}: PropsWithChildren) {
  const { currentCity } = useLocationState()

  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <button className="flex gap-0.5 p-0">
          <p className="mobile-title-small">{currentCity}</p>
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
