'use client'

import { useEffect, useRef } from 'react'

import { useMapStateContext } from '@/app/_source/context/useMapStateContext'
import { useGlobalMapStore } from '@/stores/map/store'

import { MAP_MOVE_ZOOM_MIN_LEVEL } from '../../constants/map'
import { mapEventBus } from '../../map-event-bus'
import { MAP_OPTIONS, NAMESPACE_KEY } from '../../types/map'
import MapInit from './MapInit'
import Markers from './Markers'
import Overlays from './Overlays'

/**
 * 카카오맵 기본 설정값
 * - center: 지도의 초기 중심 좌표
 * - zoomLevel: 초기 줌 레벨
 * - draggable: 드래그 가능 여부
 * - scrollwheel: 스크롤 줌 가능 여부
 */
const DEFAULT_OPTIONS = {
  center: {
    lat: MAP_OPTIONS.DEFAULT.LAT,
    lng: MAP_OPTIONS.DEFAULT.LNG,
  },
  zoomLevel: MAP_OPTIONS.DEFAULT.ZOOM,
  draggable: true,
  scrollwheel: true,
}

export default function ExhibitionMap() {
  const isInitialMove = useRef(true)
  const map = useGlobalMapStore((state) => state.map)
  const center = useMapStateContext((state) => state.center)
  const set = useMapStateContext((state) => state.set)

  useEffect(() => {
    if (!map) return

    const handleMapUpdate = (payload: {
      level: number
      bounds: kakao.maps.LatLngBounds
    }) => {
      set('zoomLevel', payload.level)
      set('bounds', payload.bounds)
    }

    const unsubscribeZoom = mapEventBus.on(
      NAMESPACE_KEY,
      'ZOOM_CHANGED',
      (payload) => {
        handleMapUpdate(payload)
      },
    )

    const unsubscribeBounds = mapEventBus.on(
      NAMESPACE_KEY,
      'BOUNDS_CHANGED',
      (payload) => {
        handleMapUpdate(payload)
      },
    )

    return () => {
      unsubscribeZoom()
      unsubscribeBounds()
    }
  }, [map, set])

  // 위치 설정시 지도 이동
  useEffect(() => {
    if (!map || !center) return

    const moveLatLng = new kakao.maps.LatLng(center.latitude, center.longitude)
    map.panTo(moveLatLng)

    if (isInitialMove.current) {
      map.setLevel(MAP_MOVE_ZOOM_MIN_LEVEL)
      isInitialMove.current = false
    }
  }, [center, map])

  return (
    <>
      <MapInit options={DEFAULT_OPTIONS} />
      <Overlays />
      <Markers />
    </>
  )
}

// export const calculateVisibleAreas = (bounds: kakao.maps.LatLngBounds) => {
//   const areas: string[] = []
//   Object.entries(areaCenterPosition).forEach(([area, position]) => {
//     const areaPosition = new kakao.maps.LatLng(position.lat, position.lng)
//     if (bounds.contain(areaPosition)) {
//       areas.push(area)
//     }
//   })

//   return areas
// }
