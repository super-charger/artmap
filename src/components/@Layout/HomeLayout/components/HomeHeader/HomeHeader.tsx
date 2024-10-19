'use client'

import Link, { LinkProps } from 'next/link'

import { LAYOUT } from '@/constants/layout'
import { headers } from '@/constants/routes'
import useActiveNavItems from '@/hooks/useActiveNavItems'
import { cn } from '@/utils/utils'

type HomeHeaderProps = {
  isScroll: boolean
}

type NavItemProps<T = string> = {
  label: string
  href: LinkProps<T>['href']
  isActive: boolean
  isScroll: HomeHeaderProps['isScroll']
}

const HomeHeader = ({ isScroll }: HomeHeaderProps) => {
  const { navItems } = useActiveNavItems(headers)

  return (
    <>
      <nav
        className={cn(
          `h-[${LAYOUT.HEADER.HEIGHT}]`,
          'flex items-center',
          'w-full',
          'p-[12px]',
        )}
      >
        <ul className="flex gap-5">
          {navItems.map((item) => {
            return (
              <NavItem
                key={item.pathname}
                href={item.pathname}
                isActive={item.isActive}
                label={item.label}
                isScroll={isScroll}
              />
            )
          })}
        </ul>
      </nav>
    </>
  )
}

const NavItem = ({ href, isActive, label, isScroll }: NavItemProps) => (
  <li
    key={label}
    className={cn(
      'text-centertext-grayscale_gray4 mobile-extra-large font-bold uppercase text-grayscale_white opacity-50',
      isScroll ? 'text-grayscale_gray3' : 'text-grayscale_white',
      isActive ? 'opacity-100' : 'opacity-50',
      {
        'text-grayscale_black': isActive && isScroll,
      },
    )}
  >
    <Link href={href}>{label}</Link>
  </li>
)

export default HomeHeader
