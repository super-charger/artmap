'use client'

import { useEffect } from 'react'

import { useGlobalMapStore } from '@/stores/map/store'

import {
  MAP_MOVE_ZOOM_MIN_LEVEL,
  areaCenterPosition,
} from '../../constants/map'
import { useMapEvents } from '../../hooks/useMapEvent'
import { useMapFilter } from '../../hooks/useMapFilter'
import { useUserCurrentLocation } from '../../hooks/useUserCurrentLocation'
import DetailMarkers from './@DetailMarker/DetailMarker'
import MarkerInfoCard from './@MarkerInfo/MarkerInfoCard'
import MarkerInfoCarousel from './@MarkerInfo/MarkerInfoCarousel'
import MapInit from './MapInit'
import { MapSkeleton } from './MapSkeleton'
import Markers from './Markers'
import Overlays from './Overlays'

export default function ExhibitionMap() {
  const map = useGlobalMapStore((state) => state.map)

  const { mapOptions, isLoading } = useUserCurrentLocation() // 사용자 현재 위치 가져오기
  const { area } = useMapFilter() // 지역 필터
  const { isProgrammaticMove } = useMapEvents() // 사용자의 지도 조작

  // 지역 필터 변경에 따른 프로그래밍 방식의 지도 이동
  useEffect(() => {
    if (!map || !area) return

    const centerPosition = areaCenterPosition[area]
    const moveLatLng = new kakao.maps.LatLng(
      centerPosition.lat,
      centerPosition.lng,
    )
    isProgrammaticMove.current = true

    map.panTo(moveLatLng)
    map.setLevel(MAP_MOVE_ZOOM_MIN_LEVEL)
  }, [area, isProgrammaticMove, map])

  if (isLoading) {
    return <MapSkeleton />
  }

  return (
    <>
      <MapInit options={mapOptions} />
      <Overlays />
      <Markers />
      <DetailMarkers />
      <MarkerInfoCarousel
        renderItem={(selectedExhibition) => (
          <MarkerInfoCard key={selectedExhibition.id} {...selectedExhibition} />
        )}
      />
    </>
  )
}
