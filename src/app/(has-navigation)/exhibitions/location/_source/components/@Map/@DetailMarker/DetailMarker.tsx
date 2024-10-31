import { useCallback, useEffect, useRef } from 'react'

import { ExhibitionStatus } from '@/apis/exhibitions/types/model/map'
import { useMapStateContext } from '@/app/_source/context/useMapStateContext'
import { useGlobalMapStore } from '@/stores/map/store'

import { useVisibleElements } from '../../../hooks/useVisibleElements'
import { mapEventBus } from '../../../map-event-bus'
import { MapElements, NAMESPACE_KEY } from '../../../types/map'
import { createClusters } from '../../../utils/clustering'
import { createMarkerContent } from './MarkerContent'

export default function DetailMarkers() {
  const map = useGlobalMapStore((state) => state.map)
  const set = useMapStateContext((state) => state.set)
  const {
    visibleElements: { detailMarkers },
  } = useVisibleElements()

  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([])
  const positionsRef = useRef<kakao.maps.LatLng[]>([])
  const cleanupFunctionsRef = useRef<(() => void)[]>([])
  const selectedExhibition = useMapStateContext(
    (state) => state.selectedExhibition,
  )

  const handleOverlayClick = useCallback(
    (exhibition: MapElements['markers'][number][]) => {
      set('selectedExhibition', exhibition)
    },
    [set],
  )

  const updateOverlays = useCallback(() => {
    if (!map || !detailMarkers?.length) return

    // Cleanup
    cleanupFunctionsRef.current.forEach((cleanup) => cleanup())
    cleanupFunctionsRef.current = []
    overlaysRef.current.forEach((overlay) => overlay.setMap(null))
    overlaysRef.current = []

    // Create clusters
    const clusters = createClusters(
      positionsRef.current,
      detailMarkers as MapElements['markers'],
    )

    // Create overlays
    clusters.forEach((cluster) => {
      // 현재 클러스터가 선택된 상태인지 확인
      const isSelected = selectedExhibition?.some(
        (exhibition) => exhibition.id === cluster.markers[0].id,
      )

      const { element, cleanup } = createMarkerContent(
        {
          count: cluster.markers.length,
          place: cluster.markers[0].place,
          status: cluster.markers[0].status as ExhibitionStatus,
          isSelected,
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
  }, [detailMarkers, handleOverlayClick, map, selectedExhibition])

  useEffect(() => {
    if (!detailMarkers?.length) return
    positionsRef.current = detailMarkers.map(
      (marker) =>
        new kakao.maps.LatLng(Number(marker.gpsY), Number(marker.gpsX)),
    )
    updateOverlays()
  }, [detailMarkers, updateOverlays])

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
      overlaysRef.current.forEach((overlay) => overlay.setMap(null))
      unsubscribeZoom()
      unsubscribeBounds()
    }
  }, [map, updateOverlays])

  return null
}
