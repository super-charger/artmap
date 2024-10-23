'use client'

import { useEffect } from 'react'

import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

import { PAGE_ROUTES, navs } from '@/constants/routes'
import useActiveNavItems from '@/hooks/useActiveNavItems'
import { cn } from '@/lib/utils'

type IconProps = {
  width: number
  height: number
}

type NavItemProps<T = string> = {
  label: string
  href: LinkProps<T>['href']
  isActive: boolean
  Icon: React.ComponentType<IconProps>
  ActiveIcon: React.ComponentType<IconProps>
}

export default function BottomNavigation() {
  const { navItems } = useActiveNavItems(navs)

  return (
    <nav className="relative">
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'm-auto h-[58px] w-full min-w-80 max-w-screen-sm',
          'items-center bg-grayscale_white',
        )}
      >
        <div className="mx-auto grid h-full max-w-lg grid-cols-5 items-center">
          {navItems.map((item) => (
            <NavItem
              key={item.pathname}
              href={item.pathname}
              isActive={item.isActive}
              Icon={item.icon}
              ActiveIcon={item.activeIcon}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({ href, isActive, Icon, ActiveIcon, label }: NavItemProps) => (
  <Link
    href={href}
    className="group inline-flex h-[46px] flex-col items-center justify-between px-5"
  >
    {isActive ?
      <ActiveIcon width={24} height={24} />
    : <Icon width={24} height={24} />}
    <p
      className={cn(
        'whitespace-nowrap text-center text-xs leading-[18px]',
        isActive ? 'text-grayscale_black' : 'text-grayscale_gray4',
      )}
    >
      {label}
    </p>
  </Link>
)
