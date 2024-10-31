import { withSetter } from '@toktokhan-dev/zustand-react'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { withStorageDOMEvents } from '@/stores/local/utils/with-storage-dom-events'

export type RecentLocation = {
  area: string
}

export type RecentLocationsStorage = {
  locations: RecentLocation[]
  maxItems: number
}

/**
 * 최근 선택한 지역을 관리하는 Zustand 스토어입니다.
 * immer 미들웨어가 적용되어 있어 상태를 직접 수정할 수 있습니다.
 *
 * @example
 * const locations = useRecentLocationsStorage((store) => store.locations)
 * const set = useRecentLocationsStorage((store) => store.set)
 *
 * // 새로운 위치 추가
 * set((state) => {
 *   state.locations.unshift({ area: "서울" })
 *   if (state.locations.length > state.maxItems) state.locations.pop()
 * })
 */
export const useRecentLocationsStorage = create(
  persist(
    withSetter(
      immer<RecentLocationsStorage>(() => ({
        locations: [],
        maxItems: 5,
      })),
    ),
    { name: '@toktokhan-dev/recent-locations' },
  ),
)

withStorageDOMEvents(useRecentLocationsStorage)
