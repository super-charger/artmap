import { useCallback, useEffect, useRef } from 'react'

import { MAP_CONSTANTS, MapElements } from '@/apis/exhibitions/types/model/map'

interface OverlaysProps {
  map: kakao.maps.Map
  overlays: MapElements['overlays']
  zoomLevel?: number
}

export default function Overlays({
  map,
  overlays,
  zoomLevel = MAP_CONSTANTS.ZOOM.OVERLAY,
}: OverlaysProps) {
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([])

  // 모든 오버레이 제거 함수
  const removeAlloverlays = useCallback(() => {
    overlaysRef.current.forEach((overlay) => overlay.setMap(null))
    overlaysRef.current = []
  }, [])

  // 카카오 오버레이 로드 함수
  const loadKakaoMarkers = useCallback(() => {
    removeAlloverlays()

    if (zoomLevel < MAP_CONSTANTS.ZOOM.OVERLAY) return

    const newOverlays = overlays?.map((overlay) => {
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
  }, [map, overlays, zoomLevel])

  // 오버레이 로드 및 클린업
  useEffect(() => {
    if (!map || !overlays) return

    loadKakaoMarkers()

    return () => {
      removeAlloverlays()
    }
  }, [map, overlays, zoomLevel, loadKakaoMarkers, removeAlloverlays])

  return <></>
}
