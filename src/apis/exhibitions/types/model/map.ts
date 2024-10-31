// TODO: tRPC
export enum ExhibitionStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
}

export type OverlayApiType = {
  area: string
  count: number
  position: {
    lat: number
    lng: number
  }
}

export type ExhibitionApiType = {
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

export type ExhibitionAreaResponse = {
  exhibitions: ExhibitionApiType[]
  areaGroups: Record<string, OverlayApiType>
}

export type AreaPositionType = {
  [key: string]: { lat: number; lng: number }
}
