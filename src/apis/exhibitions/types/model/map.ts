// TODO: tRPC
enum ExhibitionStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
}

export const MAP_CONSTANTS = {
  ZOOM: {
    OVERLAY: 7, // 클러스터가 보이는 최소 줌 레벨
    MARKER: 6, // 마커가 보이는 최대 줌 레벨
  },
  DEFAULT: {
    LAT: 37.497625203,
    LNG: 127.03088379,
    ZOOM: 10,
  },
} as const

type OverlayType = {
  area: string
  _count: { id: number }
  position: { lat: number; lng: number }
}

type ExhibitionType = {
  id: string
  area: string
  title: string
  startDate: Date
  endDate: Date
  place: string
  thumbnail: string | null
  gpsX: string
  gpsY: string
  status: ExhibitionStatus
}

export type MapElements = {
  markers: ExhibitionType[]
  overlays: OverlayType[]
}

export type MapEventListener = {
  target: kakao.maps.Map
  type: string
  handler: (...args: any[]) => void
}
