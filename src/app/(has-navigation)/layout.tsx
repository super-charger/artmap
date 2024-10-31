import {ReactNode, Suspense} from 'react'

import BottomNavigation from '@/components/BottomNavigation'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
        <Suspense fallback={<div>Loading...</div>}>  // update: 임시 Suspense 추가
      {children}
      <BottomNavigation />
        </Suspense>
    </>
  )
}
