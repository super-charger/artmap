import { useCallback, useEffect, useState } from 'react'

interface ClusterProps {
  map: any
  data: any
}

export default function Cluster({ map, data }: ClusterProps) {
  const [cluster, setCluster] = useState<
    (typeof window.kakao.maps.CustomOverlay)[]
  >([])

  const loadKakaoMarkers = useCallback(() => {
    if (map && data) {
      // 기존 클러스터 제거
      cluster.forEach((cluster) => cluster.setMap(null))

      const newcluster = data?.map(
        (exhibition: {
          area: string
          _count: { id: number }
          position: { lat: number; lng: number }
        }) => {
          const content = document.createElement('div')
          content.className = 'custom-cluster'
          content.innerHTML = `
            <div class="bg-grayscale_gray5 w-[82px] h-[82px] rounded-full flex flex-col items-center justify-center">
              <span class="font-bold mobile-title-small text-grayscale_white">${exhibition.area}</span>
              <span class="text-grayscale_white mobile-text-large font-bold">${exhibition._count.id}</span>
            </div>
          `

          const { lat, lng } = exhibition.position

          const customcluster = new window.kakao.maps.CustomOverlay({
            position: new window.kakao.maps.LatLng(lat, lng),
            content: content,
            xAnchor: 0.5,
            yAnchor: 1.0,
            minLevel: 10,
          })

          customcluster.setMap(map)
          return customcluster
        },
      )

      setCluster(newcluster)
    }
  }, [map, data])

  useEffect(() => {
    if (!map || !data) return
    loadKakaoMarkers()
  }, [map, data])

  useEffect(() => {
    return () => {
      cluster.forEach((cluster) => cluster.setMap(null))
    }
  }, [cluster])

  return null
}
