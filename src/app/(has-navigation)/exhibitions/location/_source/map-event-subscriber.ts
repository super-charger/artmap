export type KakaoMapEventType =
  | 'zoom_changed'
  | 'bounds_changed'
  | 'click'
  | 'dragstart'
  | 'dragend'

export type MapEventHandlers = {
  [K in KakaoMapEventType]?: () => void
}

export type MapEventListener = {
  type: string
  handler: () => void
}

export class MapEventSubscriber {
  private map: kakao.maps.Map | null = null
  private eventListeners: MapEventListener[] = []

  subscribe(map: kakao.maps.Map, handlers: MapEventHandlers) {
    this.unsubscribe()
    this.map = map

    Object.entries(handlers).forEach(([type, handler]) => {
      kakao.maps.event.addListener(this.map!, type, handler)
      this.eventListeners.push({
        type,
        handler,
      })
    })
  }

  unsubscribe() {
    if (!this.map) return

    this.eventListeners.forEach(({ type, handler }) => {
      kakao.maps.event.removeListener(this.map!, type, handler)
    })

    this.eventListeners = []
    this.map = null
  }
}
