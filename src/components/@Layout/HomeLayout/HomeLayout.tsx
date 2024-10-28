// HomeLayout.tsx
'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'

import { LAYOUT } from '@/constants/layout'
import { cn } from '@/utils/utils'

import HomeFooter from './components/HomeFooter'
import HomeHeader from './components/HomeHeader'

// HomeLayout.tsx

// HomeLayout.tsx

// HomeLayout.tsx

interface HomeLayoutProps {
  header?: ReactNode | ((props: { isScroll: boolean }) => ReactNode)
  footer?: ReactNode
  content?: ReactNode
  fixedScroll?: boolean // New prop to enforce scroll style statically
}

const HomeLayout = ({
  header = ({ isScroll }) => <HomeHeader isScroll={isScroll} />,
  footer = <HomeFooter />,
  content,
  fixedScroll = false, // Default behavior is to not fix the scroll style
}: HomeLayoutProps) => {
  const [isScroll, setIsScroll] = useState(fixedScroll)

  const handleScroll = useCallback(() => {
    if (!fixedScroll) setIsScroll(window.scrollY > 60)
  }, [fixedScroll])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div
      className={cn(
        'relative',
        'm-auto min-h-screen w-full min-w-80 max-w-screen-sm',
      )}
    >
      <header
        className={cn(
          `h-[${LAYOUT.HEADER.HEIGHT}]`,
          'fixed top-0 z-50 flex w-full max-w-screen-sm',
          'flex items-center justify-center',
          'transition-colors duration-300 ease-in-out',
          isScroll ? 'bg-grayscale_white' : 'bg-transparent',
        )}
      >
        {typeof header === 'function' ? header({ isScroll }) : header}
      </header>
      <main className="w-full min-w-full">{content}</main>
      <footer className="w-full py-[10px]">{footer}</footer>
    </div>
  )
}

export default HomeLayout
