import React, { useCallback, useEffect, useRef } from 'react'

import {
  useGetExhibitionsAreaQuery,
  useGetGroupByAreaQuery,
} from '@/apis/exhibitions/location/ExhibitionsLoctionApi.query'
import { MapEventListener } from '@/apis/exhibitions/types/model/map'
import { useMapStateContext } from '@/app/_source/context/useMapStateContext'

export default function useMapEventListener() {
  const { data: overlayData } = useGetGroupByAreaQuery({
    options: { staleTime: 5 * 60 * 1000 },
  })
  const { data: markersData } = useGetExhibitionsAreaQuery({
    options: { staleTime: 5 * 60 * 1000 },
  })

  const { map, setZoomLevel, updateVisibleElements } = useMapStateContext()

  if (!map) return

  // RAF 참조 변수
  const rafRef = useRef<number>()

  // 이벤트 리스너 관리를 위한 ref
  const eventListeners = useRef<Array<MapEventListener>>([])

  // 드래그 중 지도 이벤트 발생 시 최적화를 위한 RAF
  // - 드래그 할때마다 updateVisibleElements 호출 시 성능 저하 발생
  const optimizedUpdate = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current) // 이전 요청 취소
    }

    rafRef.current = requestAnimationFrame(() => {
      updateVisibleElements(map, overlayData, markersData) // 새로운 프레임에서 업데이트, 인자값을 받고 있다. ...
    })
  }, [updateVisibleElements])

  /**
   * 맵 이벤트 핸들러들
   * - zoom_changed: 줌 레벨 변경 시 상태 업데이트
   * - bounds_changed: 지도 영역 변경 시 보이는 요소들 업데이트
   */
  const mapEventHandlers = useCallback(
    () => ({
      zoom_changed: () => {
        setZoomLevel(map.getLevel()) // 줌 레벨 변경 시
        optimizedUpdate()
      },
      bounds_changed: () => {
        optimizedUpdate() // 지도 이동 시
      },
    }),
    [map, setZoomLevel, optimizedUpdate],
  )

  /**
   * 이벤트 리스너 등록 함수
   */
  const setupEventListeners = useCallback(
    (map: kakao.maps.Map, handlers: Record<string, () => void>) => {
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
   * 이벤트 리스너에 바로 함수를 넘겨서 사용하는 방법은 불가능함
   * 이벤트를 해제하려고 할 때, 그 참조를 찾을 수 없게 되어 해제가 불가능 함.
   * 다음과 같이 배열에 저장된 정보를 기반으로 동적 임포트 (Dynamic Import)해제가 가능합니다.
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
    const handlers = mapEventHandlers()
    setupEventListeners(map, handlers)

    return () => {
      cleanupEventListeners()
    }
  }, [map, mapEventHandlers, setupEventListeners, cleanupEventListeners])

  return { overlayData, markersData }
}
