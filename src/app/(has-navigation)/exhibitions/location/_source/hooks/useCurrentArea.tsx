import { useEffect, useState } from 'react'

import { useMapStateContext } from '@/app/_source/context/useMapStateContext'
import { useGlobalMapStore } from '@/stores/map/store'

import { areaCenterPosition } from '../constants/map'

/**
 * 현재 지도 중심점과 가장 가까운 지역을 찾는 훅
 */
export const useCurrentArea = () => {
  const map = useGlobalMapStore((state) => state.map)
  const center = useMapStateContext((state) => state.center)
  const [currentArea, setCurrentArea] = useState<string>('서울')

  useEffect(() => {
    if (!map) return

    // 현재 중심점 가져오기
    const currentCenter = center || {
      latitude: map.getCenter().getLat(),
      longitude: map.getCenter().getLng(),
    }

    // 각 지역과의 거리 계산
    const distances = Object.entries(areaCenterPosition).map(
      ([area, position]) => {
        const distance = Math.sqrt(
          Math.pow(currentCenter.latitude - position.lat, 2) +
            Math.pow(currentCenter.longitude - position.lng, 2),
        )
        return { area, distance }
      },
    )

    // 가장 가까운 지역 찾기
    const nearestArea = distances.reduce((nearest, current) =>
      current.distance < nearest.distance ? current : nearest,
    )

    setCurrentArea(nearestArea.area)
  }, [map, center])

  return currentArea
}
