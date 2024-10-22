import { useCallback, useEffect, useRef, useState } from 'react'

import { MAP_CONSTANTS } from '@/apis/exhibitions/types/model/map'
import { useMapStateContext } from '@/app/_source/context/useMapStateContext'

// 최적화 고민
// 1. 마커 이미지 메모이제이션
// 2. 가시영역기반..
// 3. 디바운싱..?

/**
 * Markers 컴포넌트: 카카오맵에 전시회 위치를 마커로 표시하는 컴포넌트
 *
 * 주요 기능:
 * 1. 마커 생성 및 관리
 * 2. 마커 클러스터링
 * 3. 마커 클릭 이벤트 처리
 */

export default function Markers() {
  const { map, visibleElements, setCurrentExhibition, zoomLevel } =
    useMapStateContext()

  // 클러스터러는 여러 마커를 그룹화하여 표시하는 역할
  const [clusterer, setClusterer] = useState<kakao.maps.MarkerClusterer | null>(
    null,
  )

  /**
   * 마커 배열을 관리하는 ref
   *
   * 1. 렌더링과 무관하게 값을 유지해야 함
   * 2. React의 상태로 관리하면 불필요한 재렌더링 발생
   * 3. 컴포넌트가 리렌더링되어도 마커 참조를 유지해야 함
   * 4. cleanup 시 마커를 제거하기 위해 참조를 보관해야 함
   */
  const markersRef = useRef<kakao.maps.Marker[]>([])

  /**
   * 모든 마커를 제거하는 함수
   *
   * - clusterer 의존성이 변경될 때만 함수를 재생성
   * - 불필요한 함수 재생성 방지
   */
  const removeAllMarkers = useCallback(() => {
    if (clusterer) {
      clusterer.clear() // 클러스터러에서 모든 마커 제거
    }
    markersRef.current = [] // ref 초기화
  }, [clusterer])

  /** 카카오맵에 마커를 로드하는 주요 함수 */
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      removeAllMarkers()

      // 새 마커 생성
      const newMarkers =
        visibleElements.markers?.map((exhibition) => {
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
            setCurrentExhibition(exhibition)
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
  }, [
    map,
    visibleElements.markers,
    setCurrentExhibition,
    clusterer,
    removeAllMarkers,
  ])

  /**
   * 마커 로드 및 정리를 위한 이펙트
   *
   * 주요 역할:
   * 1. 컴포넌트 마운트 시 마커 로드
   * 2. 컴포넌트 언마운트 시 마커 제거
   */
  useEffect(() => {
    loadKakaoMarkers()

    return () => {
      removeAllMarkers()
    }
  }, [loadKakaoMarkers, removeAllMarkers])

  return null
}
