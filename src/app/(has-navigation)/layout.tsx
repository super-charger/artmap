import { ReactNode } from 'react'

import BottomNavigation from '@/components/BottomNavigation'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  )
}
