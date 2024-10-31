import { useCallback, useEffect, useRef } from 'react'

import { useMapStateContext } from '@/app/_source/context/useMapStateContext'
import { useGlobalMapStore } from '@/stores/map/store'

import { useMarkerClusterer } from '../../hooks/useMarkerClusterer'
import { useMarkerImage } from '../../hooks/useMarkerImage'
import { useVisibleElements } from '../../hooks/useVisibleElements'
import { MapEventSubscriber } from '../../map-event-subscriber'
import { MapElements } from '../../types/map'

export default function Markers() {
  const map = useGlobalMapStore((state) => state.map)
  const set = useMapStateContext((state) => state.set)
  const eventSubscriberRef = useRef(new MapEventSubscriber())

  const {
    visibleElements: { markers },
  } = useVisibleElements()

  const clusterer = useMarkerClusterer()
  const markerImage = useMarkerImage()
  const markerDataMap = useRef(
    new Map<kakao.maps.Marker, MapElements['markers'][number]>(),
  )

  const handleMarkerClick = useCallback(
    (selectedExhibition: MapElements['markers'][number]) => {
      set('selectedExhibition', [selectedExhibition])
    },
    [set],
  )

  useEffect(() => {
    if (!map || !clusterer || !markerImage || !markers) return

    const subscriber = eventSubscriberRef.current
    const currentMarkerDataMap = markerDataMap.current

    clusterer.clear()
    currentMarkerDataMap.clear()

    const newMarkers = markers.map((exhibition) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(
          Number(exhibition.gpsY),
          Number(exhibition.gpsX),
        ),
        image: markerImage,
        clickable: true,
      })

      subscriber.subscribe(
        marker,
        {
          click: () => {
            const selectedExhibition = currentMarkerDataMap.get(marker)
            if (selectedExhibition) {
              handleMarkerClick(selectedExhibition)
            }
          },
        },
        false,
      )

      currentMarkerDataMap.set(
        marker,
        exhibition as MapElements['markers'][number],
      )
      return marker
    })

    if (newMarkers.length > 0) {
      clusterer.addMarkers(newMarkers)
    }

    return () => {
      clusterer.clear()
      currentMarkerDataMap.clear()
      subscriber.unsubscribe()
    }
  }, [markers, map, clusterer, markerImage, handleMarkerClick])

  return null
}
