'use client'

import { createStoreContext, withSetter } from '@toktokhan-dev/zustand-react'

import { immer } from 'zustand/middleware/immer'

import { MAP_CONSTANTS, MapElements } from '@/apis/exhibitions/types/model/map'

export type MapState = {
  map: kakao.maps.Map | null
  zoomLevel: number
  visibleElements: MapElements
  setMap: (map: kakao.maps.Map | null) => void
  setZoomLevel: (level: number) => void
  setVisibleElements: (elements: MapElements) => void
  setCurrentExhibition: (exhibition: MapElements['markers'][number]) => void
  updateVisibleElements: (
    map: kakao.maps.Map,
    overlayData: any,
    markersData: any,
  ) => void
}

export const {
  Provider: MapStateProvider,
  useContext: useMapStateContext,
  withProvider: withMapStateProvider,
} = createStoreContext(
  withSetter(
    immer<MapState>((set) => ({
      map: null,
      zoomLevel: MAP_CONSTANTS.DEFAULT.ZOOM,
      visibleElements: {
        markers: [],
        overlays: [],
      },
      setMap: (map) =>
        set((state) => {
          state.map = map
        }),
      setZoomLevel: (level) =>
        set((state) => {
          state.zoomLevel = level
        }),
      setVisibleElements: (elements) =>
        set((state) => {
          state.visibleElements = elements
        }),
      setCurrentExhibition: () => {},
      updateVisibleElements: (map, overlayData, markersData) =>
        set((state) => {
          const bounds = map.getBounds()
          const currentZoom = map.getLevel()

          if (currentZoom >= MAP_CONSTANTS.ZOOM.OVERLAY) {
            state.visibleElements.overlays =
              overlayData?.filter((overlay: any) => {
                const overlayPosition = new window.kakao.maps.LatLng(
                  overlay.position.lat,
                  overlay.position.lng,
                )
                return bounds.contain(overlayPosition)
              }) || []
            state.visibleElements.markers = []
          } else {
            state.visibleElements.markers =
              markersData?.filter((marker: any) => {
                const markerPosition = new window.kakao.maps.LatLng(
                  marker.gpsY,
                  marker.gpsX,
                )
                return bounds.contain(markerPosition)
              }) || []
            state.visibleElements.overlays = []
          }
        }),
    })),
  ),
)
