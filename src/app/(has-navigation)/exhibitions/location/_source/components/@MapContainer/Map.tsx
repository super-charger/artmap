'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'

import { MAP_CONSTANTS } from '@/apis/exhibitions/types/model/map'

interface MapProps {
  onCreate: Dispatch<SetStateAction<any>>
  options?: {
    center: { lat: number; lng: number }
    zoomLevel: number
  }
}

export default function Map({
  onCreate,
  options = {
    center: {
      lat: MAP_CONSTANTS.DEFAULT.LAT,
      lng: MAP_CONSTANTS.DEFAULT.LNG,
    },
    zoomLevel: MAP_CONSTANTS.DEFAULT.ZOOM,
  },
}: MapProps) {
  // 카카오맵 생성 함수
  const createMap = () => {
    if (
      typeof window.kakao === 'undefined' ||
      typeof window.kakao.maps === 'undefined'
    ) {
      throw new Error('카카오맵 SDK가 로드되지 않았습니다.')
    }

    // kakao.maps.load 콜백 내에서 지도 초기화
    // load 콜백 외부에서 생성하려고 하면 객체가 아직 초기화 되지 않아서 에러가 발생할 수 있다.
    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(document.getElementById('map'), {
        center: new window.kakao.maps.LatLng(
          options.center.lat,
          options.center.lng,
        ),
        level: options.zoomLevel,
      })
      onCreate(map)
    })
  }

  // 컴포넌트 마운트 시 맵 생성
  useEffect(() => {
    createMap()
  }, [onCreate])

  return <div id="map" className="h-screen w-full" />
}
