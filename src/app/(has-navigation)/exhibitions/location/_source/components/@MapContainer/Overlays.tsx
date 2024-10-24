import { useCallback, useEffect, useRef } from 'react'

import { MAP_CONSTANTS } from '@/apis/exhibitions/types/model/map'
import { useMapStateContext } from '@/app/_source/context/useMapStateContext'

export default function Overlays() {
  const { map, zoomLevel, visibleElements } = useMapStateContext()
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([])

  // 모든 오버레이 제거 함수
  const removeAllOverlays = useCallback(() => {
    overlaysRef.current.forEach((overlay) => overlay.setMap(null))
    overlaysRef.current = []
  }, [])

  // 카카오 오버레이 로드 함수
  const loadKakaoOverlays = useCallback(() => {
    if (!map) return
    removeAllOverlays()

    if (zoomLevel < MAP_CONSTANTS.ZOOM.OVERLAY) return

    const newOverlays = visibleElements.overlays?.map((overlay) => {
      // 오버레이 콘텐츠 생성
      const content = document.createElement('div')
      content.className = 'custom-overlay'
      content.innerHTML = `
        <div class="bg-grayscale_gray5 w-[82px] h-[82px] rounded-full flex flex-col items-center justify-center">
          <span class="font-bold mobile-title-small text-grayscale_white">${overlay.area}</span>
          <span class="text-grayscale_white mobile-text-large font-bold">${overlay._count.id}</span>
        </div>
      `

      const { lat, lng } = overlay.position

      // 커스텀 오버레이 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(lat, lng),
        content: content,
        xAnchor: 0.5,
        yAnchor: 1.0,
      })

      customOverlay.setMap(map)
      return customOverlay
    })

    overlaysRef.current = newOverlays || []
  }, [map, visibleElements.overlays, zoomLevel])

  // 오버레이 로드 및 클린업
  useEffect(() => {
    if (!map || !visibleElements.overlays) return

    loadKakaoOverlays()

    return () => {
      removeAllOverlays()
    }
  }, [
    map,
    visibleElements.overlays,
    zoomLevel,
    loadKakaoOverlays,
    removeAllOverlays,
  ])

  return null
}
