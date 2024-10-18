'use client'

import { LAYOUT } from '@/constants/layout'
import { cn } from '@/utils/utils'

const HomeHeader = () => {
  return (
    <>
      <header
        className={cn(
          `flex items-center`,
          `w-full h-${LAYOUT.HEADER.HEIGHT}`,
          `p-[12px]`,
        )}
      >
        <nav>
          <ul className="flex gap-5">
            <li className="mobile-extra-large">NOW</li>
            <li className="mobile-extra-large">EXHIBITION</li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default HomeHeader
