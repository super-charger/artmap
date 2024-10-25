'use client'

import { FilterSettingSheet } from '@/components/@Sheet/FilterSettingSheet'
import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'

import FilterSettingForm from './FilterSettingForm'
import LocationSettingDrawer from './LocationSettingDrawer'
import LocationSettingForm from './LocationSettingForm'

const FilterBar = () => {
  return (
    <div className="absolute z-10 mx-auto w-full max-w-xl px-4 py-5">
      <div className="flex h-[40px] w-full items-center gap-2 rounded-full border border-gray-200 bg-grayscale_white px-4 py-2.5 shadow-sm">
        {/* 위치 설정 */}
        <LocationSettingDrawer>
          <LocationSettingForm
            actions={
              <SheetClose asChild>
                <Button
                  variant="secondary"
                  size="md"
                  type="submit"
                  className="mobile-button"
                >
                  찾아보기
                </Button>
              </SheetClose>
            }
          />
        </LocationSettingDrawer>

        {/* 필터 설정 */}
        <FilterSettingSheet>
          <FilterSettingForm
            actions={
              <SheetClose asChild>
                <Button
                  variant="secondary"
                  type="submit"
                  className="mobile-button"
                >
                  찾아보기
                </Button>
              </SheetClose>
            }
          />
        </FilterSettingSheet>
      </div>
    </div>
  )
}

export default FilterBar
