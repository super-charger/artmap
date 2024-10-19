import { ReactNode } from 'react'

import HomeLayout from '@/components/@Layout/HomeLayout'

export default function MainLayout({ children }: { children: ReactNode }) {
  return <HomeLayout content={children} />
}
