import { useCallback, useEffect, useRef } from 'react'

import { ExhibitionStatus } from '@/apis/exhibitions/types/model/map'
import { useMapStateContext } from '@/app/_source/context/useMapStateContext'
import { useGlobalMapStore } from '@/stores/map/store'

import { useVisibleElements } from '../../hooks/useVisibleElements'
import { mapEventBus } from '../../map-event-bus'
import { MapElements, NAMESPACE_KEY } from '../../types/map'

// TODO: 리팩토링

export const STATUS_TYPE = {
  UPCOMING: '전시예정',
  ONGOING: '전시중',
  ENDED: '휴관중',
} as const

export default function DetailMarkers() {
  const map = useGlobalMapStore((state) => state.map)
  const set = useMapStateContext((state) => state.set)

  const {
    visibleElements: { detailMarkers },
  } = useVisibleElements()

  // refs
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([])
  const positionsRef = useRef<kakao.maps.LatLng[]>([])
  const cleanupFunctionsRef = useRef<(() => void)[]>([])

  const handleOverlayClick = useCallback(
    (exhibition: MapElements['markers'][number][]) => {
      set('selectedExhibition', exhibition)
    },
    [set],
  )

  const createOverlayContent = useCallback(
    (
      marker: { count: number; place: string; status: ExhibitionStatus },
      onClick: () => void,
    ) => {
      const content = document.createElement('div')
      const handleClick = (e: MouseEvent) => {
        e.stopPropagation()
        onClick()
      }

      const getStatusColorClass = (status: ExhibitionStatus) => {
        switch (status) {
          case 'ONGOING':
            return 'bg-primary'
          case 'UPCOMING':
            return 'bg-secondary'
          case 'ENDED':
            return 'bg-grayscale_gray4'
          default:
            return 'bg-primary'
        }
      }

      const statusColorClass = getStatusColorClass(marker.status)

      content.innerHTML = `
       <div class="relative flex items-center bg-grayscale_white rounded-[23px] w-full h-full py-1 px-2 gap-2 cursor-pointer">
        <div class="flex items-center justify-center w-9 h-9 ${statusColorClass} rounded-full">
          <span class="mobile-title-large text-grayscale_white font-bold">${marker.count}</span>
        </div>
        <div class="mobile-title-small text-primary_black flex flex-col">
          <span class="${statusColorClass.replace('bg-', 'text-')}"">${STATUS_TYPE[marker.status]}</span>
          <span class="mobile-title-small font-bold">${marker.place}</span>
        </div>
      </div>
    `

      content.addEventListener('click', handleClick)

      return {
        element: content,
        cleanup: () => {
          content.removeEventListener('click', handleClick)
        },
      }
    },
    [],
  )

  const updateOverlays = useCallback(() => {
    if (!map || !detailMarkers?.length) return

    // 이전 cleanup 함수들 실행
    cleanupFunctionsRef.current.forEach((cleanup) => cleanup())
    cleanupFunctionsRef.current = []

    // Clear existing overlays
    overlaysRef.current.forEach((overlay) => overlay.setMap(null))
    overlaysRef.current = []

    const clusters: {
      center: kakao.maps.LatLng
      markers: typeof detailMarkers
    }[] = []
    const processed = new Set()

    positionsRef.current.forEach((pos1, i) => {
      if (processed.has(i)) return

      const cluster = {
        center: pos1,
        markers: [detailMarkers[i]],
      }

      positionsRef.current.forEach((pos2, j) => {
        if (i !== j && !processed.has(j)) {
          const distance = getDistance(pos1, pos2)
          if (distance < 60) {
            cluster.markers.push(detailMarkers[j])
            processed.add(j)
          }
        }
      })

      clusters.push(cluster)
      processed.add(i)
    })

    // Create new overlays
    clusters.forEach((cluster) => {
      const { element, cleanup } = createOverlayContent(
        {
          count: cluster.markers.length,
          place: cluster.markers[0].place,

          // TODO: tRPC
          status: cluster.markers[0].status as ExhibitionStatus,
        },
        () => handleOverlayClick(cluster.markers as MapElements['markers']),
      )

      cleanupFunctionsRef.current.push(cleanup)

      const overlay = new kakao.maps.CustomOverlay({
        position: cluster.center,
        content: element,
        yAnchor: 0.5,
      })

      overlay.setMap(map)
      overlaysRef.current.push(overlay)
    })
  }, [createOverlayContent, detailMarkers, handleOverlayClick, map])

  // 마커 위치 업데이트
  useEffect(() => {
    if (!detailMarkers?.length) return

    positionsRef.current = detailMarkers.map(
      (marker) =>
        new kakao.maps.LatLng(Number(marker.gpsY), Number(marker.gpsX)),
    )

    updateOverlays()
  }, [detailMarkers, updateOverlays])

  // 지도 이벤트 구독
  useEffect(() => {
    if (!map) return

    const unsubscribeZoom = mapEventBus.on(
      NAMESPACE_KEY,
      'ZOOM_CHANGED',
      updateOverlays,
    )

    const unsubscribeBounds = mapEventBus.on(
      NAMESPACE_KEY,
      'BOUNDS_CHANGED',
      updateOverlays,
    )

    return () => {
      cleanupFunctionsRef.current.forEach((cleanup) => cleanup())
      cleanupFunctionsRef.current = []
      overlaysRef.current.forEach((overlay) => overlay.setMap(null))
      overlaysRef.current = []
      unsubscribeZoom()
      unsubscribeBounds()
    }
  }, [map, updateOverlays])

  return null
}

function getDistance(pos1: kakao.maps.LatLng, pos2: kakao.maps.LatLng) {
  const lat1 = pos1.getLat(),
    lng1 = pos1.getLng()
  const lat2 = pos2.getLat(),
    lng2 = pos2.getLng()
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2)) * 111000
}
