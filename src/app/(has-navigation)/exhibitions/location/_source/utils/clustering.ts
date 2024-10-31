import { MapElements } from '../types/map'
import { getDistance } from './getDistance'

export const createClusters = (
  positions: kakao.maps.LatLng[],
  markers: MapElements['markers'],
) => {
  const clusters: {
    center: kakao.maps.LatLng
    markers: typeof markers
  }[] = []
  const processed = new Set()

  positions.forEach((pos1, i) => {
    if (processed.has(i)) return

    const cluster = {
      center: pos1,
      markers: [markers[i]],
    }

    positions.forEach((pos2, j) => {
      if (i !== j && !processed.has(j)) {
        const distance = getDistance(pos1, pos2)
        if (distance < 60) {
          cluster.markers.push(markers[j])
          processed.add(j)
        }
      }
    })

    clusters.push(cluster)
    processed.add(i)
  })

  return clusters
}
