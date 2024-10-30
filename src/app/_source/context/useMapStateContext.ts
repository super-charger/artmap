'use client'

import { createStoreContext, withSetter } from '@toktokhan-dev/zustand-react'

import { immer } from 'zustand/middleware/immer'

import { ExhibitionApiType } from '@/apis/exhibitions/types/model/map'
import { MAP_OPTIONS } from '@/app/(has-navigation)/exhibitions/location/_source/types/map'

type MapState = {
  zoomLevel: number
  bounds: kakao.maps.LatLngBounds | null
  center: {
    latitude: number
    longitude: number
  } | null
  selectedExhibition: ExhibitionApiType[] | null
  visibleAreas: string[]
}

export const {
  Provider: MapStateProvider,
  useContext: useMapStateContext,
  withProvider: withMapStateProvider,
} = createStoreContext(
  withSetter(
    immer<MapState>(() => ({
      zoomLevel: MAP_OPTIONS.DEFAULT.ZOOM,
      bounds: null,
      visibleAreas: ['서울', '경기', '인천'],
      center: null,
      selectedExhibition: [],
    })),
  ),
)
