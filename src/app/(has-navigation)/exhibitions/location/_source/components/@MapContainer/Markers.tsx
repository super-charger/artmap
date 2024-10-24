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
   * 마커 관리를 위한 Ref 사용 설명
   *
   * 1. useState vs useRef
   *    - useState 사용 시:
   *      markerArray가 변경될 때마다 컴포넌트가 리렌더링됨
   *      예) const [markers, setMarkers] = useState([]) ❌
   *    - useRef 사용 시:
   *      markerArray가 변경되어도 컴포넌트가 리렌더링되지 않음
   *      예) const markersRef = useRef([]) ✅
   *
   * 2. 마커 참조 유지가 필요한 이유
   *    - 지도에 마커 추가: map.addMarker(marker)
   *    - 지도에서 마커 제거: map.removeMarker(marker)
   *    - 마커 위치 변경: marker.setPosition(new LatLng())
   *    → 이런 작업들을 위해 마커 객체의 참조를 계속 유지해야 함
   *
   * 3. Map 객체를 사용하는 이유
   *    - 배열 대신 Map을 사용:
   *      const markersRef = useRef<Map<string, kakao.maps.Marker>>(new Map())
   *
   *    - 배열 사용 시 문제점:
   *      markers[0], markers[1] ... 인덱스로 접근
   *      마커 찾을 때 배열 전체 순회 필요
   *      예) markers.find(m => m.id === targetId) ❌
   *
   *    - Map 사용 시 장점:
   *      markers.get('marker-1') 즉시 접근 가능
   *      마커 존재 여부 빠르게 확인: markers.has(id)
   *      특정 마커만 쉽게 제거: markers.delete(id)
   *      예) markersRef.current.get('exhibition-123') ✅
   *
   * 4. 마커 이미지 캐싱
   *    const markerImageRef = useRef<kakao.maps.MarkerImage>()
   *
   *    - 이미지 객체를 매번 생성하면:
   *      메모리 낭비 및 성능 저하
   *      예) new MarkerImage() 반복 ❌
   *
   *    - 이미지 객체를 캐싱하면:
   *      한 번 생성한 이미지 재사용
   *      메모리 사용량 감소
   *      예) markerImageRef.current ??= new MarkerImage() ✅
   *
   * 5. 실제 사용 예시
   *    // 마커 추가
   *    markersRef.current.set('exhibition-123', new kakao.maps.Marker(...))
   *
   *    // 마커 제거
   *    const marker = markersRef.current.get('exhibition-123')
   *    marker.setMap(null)
   *    markersRef.current.delete('exhibition-123')
   *
   *    // 마커 전체 정리
   *    markersRef.current.forEach(marker => marker.setMap(null))
   *    markersRef.current.clear()
   */

  const markerImageRef = useRef<kakao.maps.MarkerImage>()
  const markersRef = useRef<Map<string, kakao.maps.Marker>>(new Map()) // ID를 키로 사용하는 Map으로 변경

  // 마커 이미지 생성 함수
  const createMarkerImage = useCallback(() => {
    if (!markerImageRef.current) {
      const imageSrc = '/icons/tab/map-on.svg'
      const imageSize = new kakao.maps.Size(40, 40)
      const imageOption = { offset: new kakao.maps.Point(20, 40) }
      markerImageRef.current = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      )
    }
    return markerImageRef.current
  }, [])

  const updateMarkers = useCallback(() => {
    if (!map || !clusterer) return

    const currentMarkers = markersRef.current
    const newMarkerIds = new Set<string>()

    // 새로운 마커 생성 또는 기존 마커 재사용
    visibleElements.markers?.forEach((exhibition) => {
      const markerId = exhibition.id // 고유 ID 사용
      newMarkerIds.add(markerId)

      if (!currentMarkers.has(markerId)) {
        // 새로운 마커만 생성
        const markerPosition = new kakao.maps.LatLng(
          Number(exhibition.gpsY),
          Number(exhibition.gpsX),
        )

        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: createMarkerImage(),
        })

        kakao.maps.event.addListener(marker, 'click', () => {
          setCurrentExhibition(exhibition)
        })

        currentMarkers.set(markerId, marker)
        clusterer.addMarker(marker)
      }
    })

    // 불필요한 마커 제거
    currentMarkers.forEach((marker, id) => {
      if (!newMarkerIds.has(id)) {
        clusterer.removeMarker(marker)
        currentMarkers.delete(id)
      }
    })
  }, [
    map,
    clusterer,
    visibleElements.markers,
    setCurrentExhibition,
    createMarkerImage,
  ])

  // 클러스터러 초기화
  useEffect(() => {
    if (map && !clusterer) {
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
  }, [map])

  // 마커 업데이트
  useEffect(() => {
    updateMarkers()
  }, [updateMarkers])

  /**
   * 마커 로드 및 정리를 위한 이펙트
   *
   * 주요 역할:
   * 1. 컴포넌트 마운트 시 마커 로드
   * 2. 컴포넌트 언마운트 시 마커 제거
   */

  useEffect(() => {
    return () => {
      if (clusterer) {
        clusterer.clear()
      }
      markersRef.current.clear()
    }
  }, [clusterer])

  return null
}
