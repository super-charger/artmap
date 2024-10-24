'use client'

import { useState } from 'react'

import { FilterSettingDrawer } from '@/components/@Drawer/FilterSettingDrawer'
import SystemMarginBottom from '@/components/SystemMarginBottom'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { VerticalArrowOpenSIcon } from '@/generated/icons/MyIcons'

import FilterSettingForm from './FilterSettingForm'

const FilterBar = () => {
  const [location, setLocation] = useState('서울특별시 마포구')

  return (
    <>
      <div className="absolute z-10 mx-auto w-full max-w-xl px-4 py-2">
        <div className="flex h-[40px] w-full items-center gap-2 rounded-full border border-gray-200 bg-grayscale_white px-4 py-2.5 shadow-sm">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex gap-0.5 p-0">
                <p className="mobile-title-small">{location}</p>
                <VerticalArrowOpenSIcon />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-md p-1">
              <SheetHeader className="rounded-t-md">
                <SheetTitle>위치 설정</SheetTitle>
                <SheetDescription>
                  원하시는 지역을 선택해주세요.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                {/* 여기에 위치 선택 옵션을 추가하세요 */}
              </div>
            </SheetContent>
          </Sheet>

          {/* 필터 버튼 */}
          <FilterSettingDrawer>
            <FilterSettingForm
              actions={
                <SheetClose asChild>
                  <Button
                    variant="secondary"
                    size="lg"
                    type="submit"
                    className="mobile-button"
                  >
                    찾아보기
                  </Button>
                </SheetClose>
              }
            />
            <SheetFooter>
              <SystemMarginBottom />
            </SheetFooter>
          </FilterSettingDrawer>
        </div>
      </div>
    </>
  )
}

export default FilterBar
