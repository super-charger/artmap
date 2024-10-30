'use client'

import { useEffect, useRef } from 'react'

import { useCreateMap } from '@/app/(has-navigation)/exhibitions/location/_source/hooks/useCreateMap'
import { useGlobalMapStore } from '@/stores/map/store'

import { mapEventBus } from '../../map-event-bus'
import { MapEventSubscriber } from '../../map-event-subscriber'
import { MAP_OPTIONS, NAMESPACE_KEY } from '../../types/map'
import { MapSkeleton } from './MapSkeleton'

type MapProps = {
  options: {
    center: { lat: number; lng: number }
    zoomLevel: number
    draggable: boolean
    scrollwheel: boolean
  }
  className?: string
}

export default function MapInit({ options, ...props }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { initialize, isLoading } = useCreateMap(options)
  const eventSubscriberRef = useRef(new MapEventSubscriber())

  const set = useGlobalMapStore((state) => state.set)
  const reset = useGlobalMapStore((state) => state.reset)

  useEffect(() => {
    if (!containerRef.current) return
    const subscriber = eventSubscriberRef.current

    const initMap = async () => {
      try {
        const mapInstance = await initialize(containerRef.current!)
        if (!mapInstance) return

        set('map', mapInstance)

        subscriber.subscribe(mapInstance, {
          zoom_changed: () => {
            const level = mapInstance.getLevel()
            const bounds = mapInstance.getBounds()

            mapEventBus.emit(NAMESPACE_KEY, 'ZOOM_CHANGED', {
              level,
              bounds,
              isOverlayZoom: level >= MAP_OPTIONS.ZOOM.OVERLAY,
            })
          },
          bounds_changed: () => {
            const bounds = mapInstance.getBounds()
            const level = mapInstance.getLevel()

            mapEventBus.emit(NAMESPACE_KEY, 'BOUNDS_CHANGED', {
              bounds,
              level,
            })
          },
        })
      } catch (error) {
        console.error('Map initialization failed:', error)
      }
    }

    initMap()

    return () => {
      subscriber.unsubscribe()
      reset()
    }
  }, [initialize, reset, set])

  return (
    <>
      {isLoading && <MapSkeleton />}
      <div ref={containerRef} className="h-screen w-full" {...props} />
    </>
  )
}
