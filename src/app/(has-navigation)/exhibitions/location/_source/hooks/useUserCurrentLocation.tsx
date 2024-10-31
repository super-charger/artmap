import { useEffect, useState } from 'react'

import { MAP_OPTIONS } from '../constants/map'

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

export const useUserCurrentLocation = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [mapOptions, setMapOptions] = useState(DEFAULT_OPTIONS)

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapOptions({
          ...DEFAULT_OPTIONS,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        })
        setIsLoading(false)
      },
      (error) => {
        console.error('위치 정보 에러:', error.message)
        setIsLoading(false)
      },
    )
  }, [])

  return { isLoading, mapOptions }
}
