'use client'

import { useEffect, useRef } from 'react'

import { useSearchParams } from 'next/navigation'

import { useMapStateContext } from '@/app/_source/context/useMapStateContext'
import { useGlobalMapStore } from '@/stores/map/store'

import {
  AREA_NAME_MAP,
  MAP_MOVE_ZOOM_MIN_LEVEL,
  areaCenterPosition,
} from '../../constants/map'
import { mapEventBus } from '../../map-event-bus'
import { MAP_OPTIONS, NAMESPACE_KEY } from '../../types/map'
import MarkerInfoCard from './@MarkerInfo/MarkerInfoCard'
import MarkerInfoCarousel from './@MarkerInfo/MarkerInfoCarousel'
import DetailMarkers from './DetailMarker'
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
  const set = useMapStateContext((state) => state.set)

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

  const searchParams = useSearchParams()
  const currentCity = searchParams.get('city')

  useEffect(() => {
    if (!map || !currentCity) return

    const areaName = AREA_NAME_MAP[currentCity]
    const centerPosition = areaCenterPosition[areaName]

    const moveLatLng = new kakao.maps.LatLng(
      centerPosition.lat,
      centerPosition.lng,
    )

    map.panTo(moveLatLng)

    if (isInitialMove.current) {
      map.setLevel(MAP_MOVE_ZOOM_MIN_LEVEL)
      isInitialMove.current = false
    }
  }, [currentCity, map])

  return (
    <>
      <MapInit options={DEFAULT_OPTIONS} />
      <Overlays />
      <Markers />
      <DetailMarkers />
      <MarkerInfoCarousel
        renderItem={(selectedExhibition) => (
          <MarkerInfoCard
            key={selectedExhibition.id} //
            {...selectedExhibition}
          />
        )}
      />
    </>
  )
}
