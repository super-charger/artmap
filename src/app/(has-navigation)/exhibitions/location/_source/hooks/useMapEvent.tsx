import { useEffect, useRef } from 'react'

import { useMapStateContext } from '@/app/_source/context/useMapStateContext'
import { useGlobalMapStore } from '@/stores/map/store'

import { areaCenterPosition } from '../constants/map'
import { mapEventBus } from '../map-event-bus'
import { NAMESPACE_KEY } from '../types/map'
import { useMapFilter } from './useMapFilter'

export const useMapEvents = () => {
  const isProgrammaticMove = useRef(false)

  const map = useGlobalMapStore((state) => state.map)
  const set = useMapStateContext((state) => state.set)
  const { area } = useMapFilter()

  useEffect(() => {
    if (!map) return

    const handleMapUpdate = (payload: {
      level: number
      bounds: kakao.maps.LatLngBounds
    }) => {
      set('zoomLevel', payload.level)
      set('bounds', payload.bounds)
      set('selectedExhibition', null)
    }

    const handleCenterChanged = (payload: {
      center: kakao.maps.LatLng
      level: number
    }) => {
      if (isProgrammaticMove.current) {
        isProgrammaticMove.current = false
        const centerPosition = areaCenterPosition[area]
        set('center', {
          latitude: centerPosition.lat,
          longitude: centerPosition.lng,
        })
      } else {
        set('center', {
          latitude: payload.center.getLat(),
          longitude: payload.center.getLng(),
        })
      }
    }

    const unsubscribeZoom = mapEventBus.on(
      NAMESPACE_KEY,
      'ZOOM_CHANGED',
      handleMapUpdate,
    )
    const unsubscribeBounds = mapEventBus.on(
      NAMESPACE_KEY,
      'BOUNDS_CHANGED',
      handleMapUpdate,
    )
    const unsubscribeCenter = mapEventBus.on(
      NAMESPACE_KEY,
      'CENTER_CHANGED',
      handleCenterChanged,
    )

    return () => {
      unsubscribeZoom()
      unsubscribeBounds()
      unsubscribeCenter()
    }
  }, [area, map, set])

  return { isProgrammaticMove }
}
