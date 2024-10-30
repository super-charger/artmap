export type KakaoMapEventType =
  | 'zoom_changed'
  | 'bounds_changed'
  | 'click'
  | 'dragstart'
  | 'dragend'
  | 'mouseover'
  | 'mouseout'

export type MapEventHandlers = {
  [K in KakaoMapEventType]?: () => void
}

export type MapEventListener = {
  type: string
  handler: () => void
  target: kakao.maps.Map | kakao.maps.Marker
}

export class MapEventSubscriber {
  private eventListeners: MapEventListener[] = []

  subscribe(
    target: kakao.maps.Map | kakao.maps.Marker,
    handlers: MapEventHandlers,
    unsubscribePrevious = true,
  ) {
    if (unsubscribePrevious) {
      this.unsubscribe()
    }

    Object.entries(handlers).forEach(([type, handler]) => {
      kakao.maps.event.addListener(target, type, handler)
      this.eventListeners.push({
        type,
        handler,
        target,
      })
    })
  }

  unsubscribe() {
    this.eventListeners.forEach(({ type, handler, target }) => {
      kakao.maps.event.removeListener(target, type, handler)
    })

    this.eventListeners = []
  }
}
