import { useCallback, useEffect, useRef, useState } from 'react'

type MapOptionType = {
  center: { lat: number; lng: number }
  zoomLevel: number
  draggable: boolean
  scrollwheel: boolean
}

export const useCreateMap = (options: MapOptionType) => {
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null)
  const initializingRef = useRef<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

  const createMap = useCallback(
    (container: HTMLDivElement) => {
      if (mapInstanceRef.current) {
        return mapInstanceRef.current
      }

      const mapInstance = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(
          options.center.lat,
          options.center.lng,
        ),
        level: options.zoomLevel,
        draggable: options.draggable,
        scrollwheel: options.scrollwheel,
      })

      // 맵 인스턴스를 즉시 저장하고 반환
      mapInstanceRef.current = mapInstance
      return mapInstance
    },
    [options],
  )

  const initializeMap = useCallback(
    async (
      container: HTMLDivElement | null,
    ): Promise<kakao.maps.Map | undefined> => {
      if (!container || initializingRef.current) return

      initializingRef.current = true
      setIsLoading(true)

      try {
        if (!window.kakao?.maps) {
          throw new Error('카카오맵 SDK가 로드되지 않았습니다.')
        }

        // SDK 초기화 대기
        await new Promise<void>((resolve) => {
          if (window.kakao.maps.load) {
            window.kakao.maps.load(resolve)
          } else {
            resolve()
          }
        })

        const mapInstance = createMap(container)
        console.log('맵 인스턴스 생성 완료:', mapInstance)

        // 레이아웃 강제 갱신
        setTimeout(() => {
          mapInstance.relayout()
        }, 0)

        return mapInstance
      } catch (error) {
        console.error('맵 초기화 실패:', error)
        throw error
      } finally {
        setIsLoading(false)
        initializingRef.current = false
      }
    },
    [createMap],
  )

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null
      }
    }
  }, [])

  return {
    initialize: initializeMap,
    isLoading,
  }
}
