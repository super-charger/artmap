import { useCallback } from 'react'

import { Route } from 'next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { ExhibitionStatus } from '@/apis/exhibitions/types/model/map'

export const useMapFilter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const area = searchParams.get('city') || ''
  const status = (searchParams.get('status') || ExhibitionStatus.ONGOING) as
    | ExhibitionStatus.ONGOING
    | ExhibitionStatus.ENDED

  const updateFilter = useCallback(
    ({
      newArea,
      newStatus,
    }: {
      newArea?: string
      newStatus?: ExhibitionStatus
    }) => {
      const params = new URLSearchParams(searchParams)

      if (newArea) params.set('city', newArea)
      if (newStatus) params.set('status', newStatus)

      const url = `${pathname}?${params.toString()}` as Route
      router.push(url)
    },
    [searchParams, pathname, router],
  )

  const queryParams = {
    area,
    status,
  }

  return {
    area,
    status,
    updateFilter,
    queryParams,
  }
}
