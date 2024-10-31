import {
  MapEventSubscriberHandlers,
  MapEventSubscriberListener,
} from './types/map'

export class MapEventSubscriber {
  private eventListeners: MapEventSubscriberListener[] = []

  subscribe(
    target: kakao.maps.Map | kakao.maps.Marker,
    handlers: MapEventSubscriberHandlers,
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
