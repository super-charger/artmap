'use client'

import { createStoreContext, withSetter } from '@toktokhan-dev/zustand-react'

import { immer } from 'zustand/middleware/immer'

export type MapStoreType = {
  map: kakao.maps.Map | null
  namespace: string
}

export const {
  Provider: GlobalMapStoreProvider,
  useContext: useGlobalMapStore,
  withProvider: withGlobalMapProvider,
} = createStoreContext(
  withSetter(
    immer<MapStoreType>(() => ({
      map: null,
      namespace: '',
    })),
  ),
)
