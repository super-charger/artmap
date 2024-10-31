'use client'

import { useMemo } from 'react'

import { useSelectedLayoutSegments } from 'next/navigation'

type BaseNavItem = {
  label: string
  pathname: string
}

const useActiveNavItems = <T extends BaseNavItem>(navs: T[]) => {
  const segments = useSelectedLayoutSegments()

  const navItems = useMemo(() => {
    return navs.map((link) => ({
      ...link,
      isActive: isRouteActive(segments, link.pathname),
    }))
  }, [segments])

  return { navItems }
}

const isRouteActive = (segments: string[], route: string) => {
  // 각 세그먼트만 포함하는 배열을 반환합니다.
  const routeParts = route.split('/').filter(Boolean)
  return routeParts.includes(segments[0])
}

export default useActiveNavItems
