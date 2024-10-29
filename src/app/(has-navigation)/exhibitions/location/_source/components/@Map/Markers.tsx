import { useCallback, useEffect, useRef } from 'react'

import { useGlobalMapStore } from '@/stores/map/store'

import { useMarkerClusterer } from '../../hooks/useMarkerClusterer'
import { useMarkerImage } from '../../hooks/useMarkerImage'
import { useVisibleElements } from '../../hooks/useVisibleElements'
import { mapEventBus } from '../../map-event-bus'
import { MapElements, NAMESPACE_KEY } from '../../types/map'

export default function Markers() {
  const map = useGlobalMapStore((state) => state.map)

  const {
    visibleElements: { markers },
  } = useVisibleElements()
  const clusterer = useMarkerClusterer()
  const markerImage = useMarkerImage()

  // 마커 데이터 관리
  const markerDataMap = useRef(
    new Map<kakao.maps.Marker, MapElements['markers'][number]>(),
  )

  // 마커 이벤트 핸들러
  const handleMarkerClick = useCallback(
    (selectedExhibition: MapElements['markers'][number]) => {
      mapEventBus.emit(NAMESPACE_KEY, 'MARKER_CLICKED', {
        marker: selectedExhibition,
      })
    },
    [],
  )

  // 마커 생성 및 업데이트
  useEffect(() => {
    if (!map || !clusterer || !markerImage || !markers) return

    // 기존 마커 제거
    clusterer.clear()
    markerDataMap.current.clear()

    // 새 마커 생성
    const newMarkers = markers.map((exhibition) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(
          Number(exhibition.gpsY),
          Number(exhibition.gpsX),
        ),
        image: markerImage,
        clickable: true,
      })

      kakao.maps.event.addListener(marker, 'click', () => {
        const selectedExhibition = markerDataMap.current.get(marker)
        if (selectedExhibition) {
          handleMarkerClick(selectedExhibition)
        }
      })

      markerDataMap.current.set(
        marker,
        exhibition as MapElements['markers'][number],
      )
      return marker
    })

    if (newMarkers.length > 0) {
      clusterer.addMarkers(newMarkers)
    }
  }, [markers, map, clusterer, markerImage, handleMarkerClick])

  return null
}
