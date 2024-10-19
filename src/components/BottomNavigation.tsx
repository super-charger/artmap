'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navs } from '@/constants/routes'
import { cn } from '@/utils/utils'

export default function BottomNavigation() {
  const pathname = usePathname()

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
          {navs.map((link) => {
            const LinkIcon = link.icon
            const ActiveLinkIcon = link.activeIcon
            const isActive = pathname === link.pathname
            return (
              <Link
                key={link.pathname}
                href={link.pathname}
                className="group inline-flex h-[46px] flex-col items-center justify-between px-5"
              >
                {isActive ?
                  <ActiveLinkIcon width={24} height={24} />
                : <LinkIcon width={24} height={24} />}
                <p
                  className={cn(
                    'whitespace-nowrap text-center text-xs leading-[18px] text-grayscale_gray4',
                    {
                      'text-grayscale_black': isActive,
                    },
                  )}
                >
                  {link.label}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
