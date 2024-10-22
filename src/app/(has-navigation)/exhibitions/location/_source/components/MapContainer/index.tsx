'use client'

import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import dynamic from 'next/dynamic'

import {
  useGetExhibitionsAreaQuery,
  useGetGroupByAreaQuery,
} from '@/apis/exhibitions/location/ExhibitionsLoctionApi.query'
import { MAP_CONSTANTS, MapElements } from '@/apis/exhibitions/types/model/map'

import Map from './Map'

// 줌 레벨이 7보다 클때 -> 클러스터
// 줌 레벨이 7보다 작을 때 -> 마커

// 마커
// 현재 보이는 영역의 마커만 처리
// - 마커가 겹쳐지면 클러스터링 처리

// 지역 중심 오버레이
// 현재 보이는 영역의 클러스터만 처리

// zoom 변경 이벤트
// - zoom_chaged
// 현재 보이는 영역을 어떻게 구하는지?
// - bounds_changed

const Overlays = dynamic(() => import('./Overlays'), { suspense: true })
const Markers = dynamic(() => import('./Markers'), { suspense: true })

export default function MapContainer() {
  // 상태
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(MAP_CONSTANTS.DEFAULT.ZOOM)
  const [visibleElements, setVisibleElements] = useState<MapElements>({
    // 현재 영역에서 보이는 엘리먼트
    markers: [],
    overlays: [],
  })

  // 이벤트 리스너 관리를 위한 ref
  const eventListeners = useRef<
    Array<{
      target: any
      type: string
      handler: (...args: any[]) => void
    }>
  >([])

  // 데이터 fetching
  const { data: overlayData } = useGetGroupByAreaQuery({
    options: {
      staleTime: 5 * 60 * 1000,
    },
  })
  const {
    data: markersData,
    error,
    isLoading,
  } = useGetExhibitionsAreaQuery({
    options: {
      staleTime: 5 * 60 * 1000,
    },
  })

  // 현재 보이는 요소 업데이트 함수
  const updateVisibleElements = useCallback(() => {
    if (!map || !overlayData) return

    const bounds = map.getBounds()
    const currentZoom = map.getLevel()

    // 줌 레벨에 따라 오버레이 또는 마커 표시
    if (currentZoom >= MAP_CONSTANTS.ZOOM.OVERLAY) {
      // 오버레이 표시 로직
      const visibleOverlays =
        overlayData?.filter((overlay) => {
          const overlayPosition = new window.kakao.maps.LatLng(
            overlay.position.lat,
            overlay.position.lng,
          )
          return bounds.contain(overlayPosition)
        }) || []

      setVisibleElements({
        markers: [],
        overlays: visibleOverlays,
      })
    } else {
      // 마커 표시 로직
      const visibleMarkers =
        markersData?.filter((marker) => {
          const markerPosition = new window.kakao.maps.LatLng(
            marker.gpsY,
            marker.gpsX,
          )
          return bounds.contain(markerPosition)
        }) || []

      setVisibleElements({
        markers: visibleMarkers,
        overlays: [],
      })
    }
  }, [map, overlayData, markersData])

  // 맵 이벤트 리스너 설정
  useEffect(() => {
    if (!map) return

    const handlers = {
      zoom_changed: () => {
        setZoomLevel(map.getLevel())
        updateVisibleElements()
      },
      bounds_changed: updateVisibleElements,
    }

    // 이벤트 리스너 등록
    Object.entries(handlers).forEach(([type, handler]) => {
      kakao.maps.event.addListener(map, type, handler)
      eventListeners.current.push({ target: map, type, handler })
    })

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    // https://devtalk.kakao.com/t/removelistener/41884/2
    return () => {
      eventListeners.current.forEach(({ target, type, handler }) => {
        kakao.maps.event.removeListener(target, type, handler)
      })
      eventListeners.current = []
    }
  }, [map, updateVisibleElements])

  // 초기데이터 로드
  useEffect(() => {
    if (map && overlayData) {
      updateVisibleElements()
    }
  }, [map, overlayData])

  return (
    <>
      <Map onCreate={setMap} />
      <Suspense fallback={<div>Loading overlays...</div>}>
        {map && overlayData && (
          <Overlays
            map={map}
            overlays={visibleElements.overlays}
            zoomLevel={zoomLevel}
          />
        )}
      </Suspense>
      <Suspense
        fallback={
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            Loading markers...
          </div>
        }
      >
        {map && (
          <Markers
            map={map}
            markers={visibleElements.markers}
            setCurrentexhibition={() => {}}
          />
        )}
      </Suspense>
    </>
  )
}
