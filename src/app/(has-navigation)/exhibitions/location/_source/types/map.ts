import {
  ExhibitionApiType,
  OverlayApiType,
} from '@/apis/exhibitions/types/model/map'

export const NAMESPACE_KEY = 'EXHIBITION_LOCATION' as const

export type MapElements = {
  markers: ExhibitionApiType[]
  overlays: OverlayApiType[]
}

export type KakaoMapEventType =
  | 'zoom_changed'
  | 'bounds_changed'
  | 'click'
  | 'dragstart'
  | 'dragend'

export type MapEventHandlers = {
  [K in KakaoMapEventType]: () => void
}

export type MapEventListener = {
  type: string
  handler: (...args: any[]) => void
}

export type MapEventType =
  | 'BOUNDS_CHANGED'
  | 'ZOOM_CHANGED'
  | 'MAP_READY'
  | 'MARKER_CLICKED'

export type MapEventPayloads = {
  BOUNDS_CHANGED: {
    level: number
    bounds: kakao.maps.LatLngBounds
  }
  ZOOM_CHANGED: {
    level: number
    bounds: kakao.maps.LatLngBounds
    isOverlayZoom: boolean
  }
  MAP_READY: {
    map: kakao.maps.Map
  }
  MARKER_CLICKED: {
    marker: ExhibitionApiType
  }
}

export type EventBusType = {
  emit: <T extends MapEventType>(
    namespaceKey: string,
    type: T,
    payload: MapEventPayloads[T],
  ) => void
  on: <T extends MapEventType>(
    namespaceKey: string,
    type: T,
    handler: (payload: MapEventPayloads[T]) => void,
  ) => () => void
  cleanup: () => void
}

export const MAP_OPTIONS = {
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

export const MARKER_CONSTANTS = {
  GRID_SIZE: 60,
  MIN_CLUSTER_SIZE: 2,
  CLUSTER_STYLES: [
    {
      width: '30px',
      height: '30px',
      background: 'rgba(68, 68, 68, .8)',
      borderRadius: '15px',
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      lineHeight: '31px',
    },
  ],
  DEFAULT_IMAGE: {
    SIZE: { width: 40, height: 40 },
    OFFSET: { x: 20, y: 40 },
    PATH: '/icons/tab/map-on.svg',
  },
  DEBOUNCE_DELAY: 300,
} as const
