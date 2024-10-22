import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { MAP_CONSTANTS, MapElements } from '@/apis/exhibitions/types/model/map'

interface MarkerProps {
  map: any
  markers: MapElements['markers']
  setCurrentexhibition: Dispatch<SetStateAction<any>>
}

export default function Markers({
  map,
  markers,
  setCurrentexhibition,
}: MarkerProps) {
  const markersRef = useRef<kakao.maps.Marker[]>([])
  const [clusterer, setClusterer] = useState<kakao.maps.MarkerClusterer | null>(
    null,
  )

  // 모든 마커 제거 함수
  const removeAllMarkers = useCallback(() => {
    if (clusterer) {
      clusterer.clear()
    }
    markersRef.current = []
  }, [clusterer])

  // 카카오 마커 로드 함수
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      removeAllMarkers()

      // 새 마커 생성
      const newMarkers =
        markers?.map((exhibition) => {
          // 마커 이미지 설정
          const imageSrc = '/icons/tab/map-on.svg'
          const imageSize = new kakao.maps.Size(40, 40)
          const imageOption = { offset: new kakao.maps.Point(20, 40) }
          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          )

          // 마커 위치 설정
          const markerPosition = new kakao.maps.LatLng(
            Number(exhibition.gpsY),
            Number(exhibition.gpsX),
          )

          // 마커 생성
          const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
          })

          // 마커 클릭 이벤트 설정
          kakao.maps.event.addListener(marker, 'click', function () {
            setCurrentexhibition(exhibition)
          })

          return marker
        }) || []

      markersRef.current = newMarkers

      // 클러스터러 생성 또는 업데이트
      if (!clusterer) {
        const newClusterer = new kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: MAP_CONSTANTS.ZOOM.MARKER,
          calculator: [30],
          styles: [
            {
              width: '30px',
              height: '30px',
              background: 'rgba(68, 68, 68, .8)',
              borderRadius: '15px',
              color: '#fff',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '31px',
            },
          ],
        })
        setClusterer(newClusterer)
      }

      clusterer?.addMarkers(newMarkers)
    }
  }, [map, markers, setCurrentexhibition, clusterer, removeAllMarkers])

  // 마커 로드 및 클린업
  useEffect(() => {
    loadKakaoMarkers()

    return () => {
      removeAllMarkers()
    }
  }, [loadKakaoMarkers, removeAllMarkers])

  return null
}
