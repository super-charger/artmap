import { useEffect, useRef } from 'react'

import { useGlobalMapStore } from '@/stores/map/store'

import { MARKER_CONSTANTS } from '../types/map'

export const useMarkerClusterer = () => {
  const map = useGlobalMapStore((state) => state.map)
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null)

  useEffect(() => {
    if (!map) return

    clustererRef.current = new kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      disableClickZoom: true,
      gridSize: MARKER_CONSTANTS.GRID_SIZE,
      minClusterSize: MARKER_CONSTANTS.MIN_CLUSTER_SIZE,
      calculator: [30],
      styles: [...MARKER_CONSTANTS.CLUSTER_STYLES],
    })

    // 클러스터 클릭 비활성화
    if (clustererRef.current) {
      kakao.maps.event.addListener(
        clustererRef.current,
        'clusterclick',
        () => false,
      )
    }

    return () => {
      if (clustererRef.current) {
        clustererRef.current.clear()
        clustererRef.current = null
      }
    }
  }, [map])

  return clustererRef.current
}
