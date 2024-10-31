import {ReactNode, Suspense} from 'react'

import BottomNavigation from '@/components/BottomNavigation'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
        {/*update: 임시 Suspense 추가*/}
        <Suspense fallback={<div>Loading...</div>}>
      {children}
      <BottomNavigation />
        </Suspense>
    </>
  )
}
