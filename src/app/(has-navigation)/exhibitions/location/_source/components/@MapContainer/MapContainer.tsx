'use client'

import React, { Suspense, useCallback, useEffect, useRef } from 'react'

import dynamic from 'next/dynamic'

import {
  useGetExhibitionsAreaQuery,
  useGetGroupByAreaQuery,
} from '@/apis/exhibitions/location/ExhibitionsLoctionApi.query'
import { MapEventListener } from '@/apis/exhibitions/types/model/map'
import { useMapStateContext } from '@/app/_source/context/useMapStateContext'

import Map from './Map'

const Overlays = dynamic(() => import('./Overlays'), { suspense: true })
const Markers = dynamic(() => import('./Markers'), { suspense: true })

export default function MapContainer() {
  const { map, setMap, setZoomLevel, updateVisibleElements } =
    useMapStateContext()

  // 이벤트 리스너 관리를 위한 ref
  const eventListeners = useRef<MapEventListener[]>([])

  const rafRef = useRef<number>()

  // 데이터 fetching - staleTime 5분 설정
  const { data: overlayData } = useGetGroupByAreaQuery({
    options: { staleTime: 5 * 60 * 1000 },
  })
  const { data: markersData } = useGetExhibitionsAreaQuery({
    options: { staleTime: 5 * 60 * 1000 },
  })

  // 드래그 중 지도 이벤트 발생 시 최적화를 위한 RAF
  // - 드래그 할때마다 updateVisibleElements 호출 시 성능 저하 발생
  const optimizedUpdate = useCallback(
    (map: kakao.maps.Map, overlayData: any, markersData: any) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current) // 이전 요청 취소
      }

      rafRef.current = requestAnimationFrame(() => {
        updateVisibleElements(map, overlayData, markersData) // 새로운 프레임에서 업데이트
      })
    },
    [updateVisibleElements],
  )

  /**
   * 맵 이벤트 핸들러들
   * - zoom_changed: 줌 레벨 변경 시 상태 업데이트
   * - bounds_changed: 지도 영역 변경 시 보이는 요소들 업데이트
   */
  const mapEventHandlers = useCallback(
    () => ({
      zoom_changed: () => {
        if (!map) return
        setZoomLevel(map.getLevel()) // 줌 레벨 변경 시
        optimizedUpdate(map, overlayData, markersData)
      },
      bounds_changed: () => {
        if (!map) return
        optimizedUpdate(map, overlayData, markersData) // 지도 이동 시
      },
    }),
    [map, setZoomLevel, optimizedUpdate, overlayData, markersData],
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

  // RAF cleanup 추가
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
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
