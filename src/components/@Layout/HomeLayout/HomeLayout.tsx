'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'

import { LAYOUT } from '@/constants/layout'
import { cn } from '@/utils/utils'

import HomeFooter from './components/HomeFooter'
import HomeHeader from './components/HomeHeader'

interface HomeLayoutProps {
  header?: ReactNode
  footer?: ReactNode
  content?: ReactNode
}

const HomeLayout = ({
  header = <HomeHeader />,
  footer = <HomeFooter />,
  content,
}: HomeLayoutProps) => {
  const [isScroll, setIsScroll] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScroll(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div
      className={cn(
        `relative`,
        `m-auto min-h-screen w-full min-w-80 max-w-screen-sm`,
      )}
    >
      <header
        className={cn(
          `fixed top-0 z-50 flex w-full max-w-screen-sm`,
          `h-[${LAYOUT.HEADER.HEIGHT}] flex items-center justify-center`,
          `transition-colors duration-300 ease-in-out`,
          isScroll ? 'bg-grayscale_white' : 'bg-transparent',
        )}
      >
        {header}
      </header>
      <main className="pt-[${LAYOUT.HEADER.HEIGHT} w-full min-w-full">
        {content}
      </main>
      <footer className="w-full py-[30px]">{footer}</footer>
    </div>
  )
}

export default HomeLayout
