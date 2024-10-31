import {
  ExhibitionApiType,
  OverlayApiType,
} from '@/apis/exhibitions/types/model/map'

export const NAMESPACE_KEY = 'EXHIBITION_LOCATION' as const

export type MapElements = {
  markers: ExhibitionApiType[]
  overlays: OverlayApiType[]
}

export type KakaoMapEventSubscriberType =
  | 'zoom_changed'
  | 'bounds_changed'
  | 'click'
  | 'dragstart'
  | 'dragend'
  | 'mouseover'
  | 'mouseout'
  | 'center_changed'
  | 'drag'

export type MapEventType =
  | 'BOUNDS_CHANGED'
  | 'ZOOM_CHANGED'
  | 'MAP_READY'
  | 'MARKER_CLICKED'
  | 'DRAG_START'
  | 'DRAG_END'
  | 'DRAGGING'
  | 'CENTER_CHANGED'

export type MapEventSubscriberHandlers = {
  [K in KakaoMapEventSubscriberType]?: () => void
}

export type MapEventSubscriberListener = {
  type: string
  handler: () => void
  target: kakao.maps.Map | kakao.maps.Marker
}

export type MapEventListener = {
  type: string
  handler: (...args: any[]) => void
}

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
  CENTER_CHANGED: {
    center: kakao.maps.LatLng
    level: number
  }
  DRAG_START: {}
  DRAG_END: {
    center: kakao.maps.LatLng
    level: number
  }
  DRAGGING: {
    center: kakao.maps.LatLng
    level: number
    isDragging: boolean
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
