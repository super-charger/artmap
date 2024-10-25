'use client'

import { useState } from 'react'

import { HeartIcon } from 'lucide-react'

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

export default function LocationDrawer() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      shouldScaleBackground={false}
      snapPoints={[0.15, 1]}
      dismissible={false}
    >
      <DrawerContent
        className="m-auto h-[100dvh] max-w-screen-sm cursor-pointer"
        isOverlayHidden={true}
      >
        <DrawerHeader>
          <DrawerTitle className="text-center text-point sm:mobile-text-small">
            이 주변의 전시 리스트
          </DrawerTitle>
        </DrawerHeader>
        <div className="hide-scrollbar overflow-y-auto p-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, index) => (
            <div className="space-y-4" key={index}>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <img
                      src="/api/placeholder/80/80"
                      alt="Exhibition"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">ANNIVERSARY OF INFECTION</h3>
                    <p className="text-sm text-muted-foreground">
                      최장원 개인전
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      에이갤러리
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      2021.08.01 - 2021.09.09
                    </p>
                  </div>
                  <button className="flex-shrink-0">
                    <HeartIcon className="h-6 w-6 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <DrawerFooter className="h-[100px]"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
