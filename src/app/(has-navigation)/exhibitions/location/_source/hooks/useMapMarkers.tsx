import { useCallback, useRef } from 'react'

import { useGlobalMapStore } from '@/stores/map/store'

export const useMapMarkers = () => {
  const map = useGlobalMapStore((state) => state.map)
  const markerImage = useRef<kakao.maps.MarkerImage>()

  // 마커 이미지 생성 함수
  const createMarkerImage = useCallback(() => {
    if (!markerImage.current) {
      markerImage.current = new kakao.maps.MarkerImage(
        '/icons/tab/map-on.svg', // 렌더링 될 마커 이미지 경로입니다.
        new kakao.maps.Size(40, 40), // 마커의 이미지 사이즈
        { offset: new kakao.maps.Point(20, 40) }, // 마커 이미지의 오프셋
      )
    }
    return markerImage.current
  }, [])

  // 마커 생성 함수
  const createMarker = useCallback(
    (gpsY: number, gpsX: number) => {
      if (!map) return

      const position = new kakao.maps.LatLng(gpsY, gpsX)
      return new kakao.maps.Marker({
        map,
        position,
        image: createMarkerImage(),
      })
    },
    [createMarkerImage, map],
  )

  return { createMarker }
}
