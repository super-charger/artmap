'use client'

import React, { Suspense, useCallback, useEffect, useRef } from 'react'

import dynamic from 'next/dynamic'

import {
  useGetExhibitionsAreaQuery,
  useGetGroupByAreaQuery,
} from '@/apis/exhibitions/location/ExhibitionsLoctionApi.query'
import { MAP_CONSTANTS } from '@/apis/exhibitions/types/model/map'
import { useMapStateContext } from '@/app/_source/context/useMapStateContext'

import Map from './Map'

/**
 * 동적으로 로드할 컴포넌트들
 * - 초기 번들 사이즈 최적화를 위해 dynamic import 사용
 */
const Overlays = dynamic(() => import('./Overlays'), { suspense: true })
const Markers = dynamic(() => import('./Markers'), { suspense: true })

export default function MapContainer() {
  const { map, setMap, setZoomLevel, updateVisibleElements } =
    useMapStateContext()

  // 이벤트 리스너 관리를 위한 ref
  const eventListeners = useRef<
    Array<{ target: any; type: string; handler: (...args: any[]) => void }>
  >([])

  // 데이터 fetching - staleTime 5분 설정
  const { data: overlayData } = useGetGroupByAreaQuery({
    options: { staleTime: 5 * 60 * 1000 },
  })
  const { data: markersData } = useGetExhibitionsAreaQuery({
    options: { staleTime: 5 * 60 * 1000 },
  })

  /**
   * 맵 이벤트 핸들러들
   * - zoom_changed: 줌 레벨 변경 시 상태 업데이트
   * - bounds_changed: 지도 영역 변경 시 보이는 요소들 업데이트
   */
  const mapEventHandlers = useCallback(
    () => ({
      zoom_changed: () => {
        if (!map) return
        setZoomLevel(map.getLevel())
        updateVisibleElements(map, overlayData, markersData)
      },
      bounds_changed: () => {
        if (!map) return
        updateVisibleElements(map, overlayData, markersData)
      },
    }),
    [map, setZoomLevel, updateVisibleElements, overlayData, markersData],
  )

  /**
   * 이벤트 리스너 등록 함수
   */
  const setupEventListeners = useCallback(
    (map: any, handlers: Record<string, () => void>) => {
      Object.entries(handlers).forEach(([type, handler]) => {
        kakao.maps.event.addListener(map, type, handler)
        eventListeners.current.push({ target: map, type, handler })
      })
    },
    [],
  )

  /**
   * 이벤트 리스너 정리 함수
   * https://devtalk.kakao.com/t/removelistener/41884/2
   */
  const cleanupEventListeners = useCallback(() => {
    eventListeners.current.forEach(({ target, type, handler }) => {
      kakao.maps.event.removeListener(target, type, handler)
    })
    eventListeners.current = []
  }, [])

  /**
   * 맵 이벤트 리스너 설정 Effect
   * - 맵 인스턴스가 생성되면 이벤트 리스너 등록
   * - 컴포넌트 언마운트 시 이벤트 리스너 정리
   */
  useEffect(() => {
    if (!map) return

    const handlers = mapEventHandlers()
    setupEventListeners(map, handlers)

    return () => {
      cleanupEventListeners()
    }
  }, [map, mapEventHandlers, setupEventListeners, cleanupEventListeners])

  /**
   * 초기 데이터 로드 Effect
   * - 맵과 데이터가 모두 준비되면 보이는 요소들 초기화
   */
  useEffect(() => {
    if (map && overlayData && markersData) {
      updateVisibleElements(map, overlayData, markersData)
    }
  }, [map, overlayData, markersData, updateVisibleElements])

  return (
    <>
      <Map onCreate={setMap} />
      <Suspense fallback={<div>Loading overlays...</div>}>
        {map && overlayData && <Overlays />}
      </Suspense>
      <Suspense
        fallback={
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            Loading markers...
          </div>
        }
      >
        {map && <Markers />}
      </Suspense>
    </>
  )
}

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
