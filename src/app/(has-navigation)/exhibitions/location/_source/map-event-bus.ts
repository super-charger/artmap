import { MapEventPayloads, MapEventType } from './types/map'

/**
 * MapEventBus: 지도 관련 이벤트를 관리하는 클래스
 * - 싱글톤 패턴을 사용하여 단일 인스턴스만 유지
 * - 이벤트 발행(emit)과 구독(on)을 관리
 * - RequestAnimationFrame을 사용하여 성능 최적화
 */

class MapEventBus {
  private static instance: MapEventBus
  private subscribers: Map<
    string,
    Set<(payload: MapEventPayloads[MapEventType]) => void>
  > = new Map()

  private rafMap: Map<string, number>

  private readonly DEBOUNCE_THRESHOLD = 16 // ~60fps

  private constructor() {
    this.subscribers = new Map()
    this.rafMap = new Map()
  }

  static getInstance(): MapEventBus {
    if (!MapEventBus.instance) {
      MapEventBus.instance = new MapEventBus()
    }
    return MapEventBus.instance
  }

  /**
   * emit: 이벤트를 발행하는 메서드
   *
   * @param type 이벤트 타입 (예: 'BOUNDS_CHANGED', 'ZOOM_CHANGED')
   * @param payload 이벤트와 함께 전달할 데이터
   *
   * 동작 과정:
   * 1. RAF 키 생성 ('이벤트타입-현재시간')
   * 2. 이전 RAF가 있다면 취소 (연속 호출 방지)
   * 3. 새로운 RAF 예약
   * 4. RAF 실행 시:
   *    - 해당 타입의 모든 구독자 함수 실행
   *    - RAF 키 삭제
   *
   * 사용 예시:
   * eventBus.emit('BOUNDS_CHANGED', {
   *   bounds: mapBounds,
   *   zoom: currentZoom
   * })
   */
  emit<T extends MapEventType>(
    namespaceKey: string,
    type: T,
    payload: MapEventPayloads[T],
  ): void {
    const eventKey = `${namespaceKey}:${type}` // 여기 수정
    const rafKey = `${type}-${Date.now()}`

    // 이전 RAF가 있다면 취소
    if (this.rafMap.has(rafKey)) {
      cancelAnimationFrame(this.rafMap.get(rafKey)!)
    }

    // 새로운 RAF 예약
    const rafId = requestAnimationFrame(() => {
      // eventKey로 수정된 키로 핸들러 검색
      const handlers = this.subscribers.get(eventKey)

      handlers?.forEach((handler) => {
        try {
          handler(payload)
        } catch (error) {
          console.error(`Error in ${type} event handler:`, error)
        }
      })

      this.rafMap.delete(rafKey)
    })

    this.rafMap.set(rafKey, rafId)
  }

  /**
   * @param type 이벤트 타입
   * @param handler 핸들러 함수
   * @returns 이벤트 구독 해제 함수
   *
   * 이벤트 구독
   * 특정 이벤트 타입에 대한 핸들러 함수 등록
   *
   * 'on' 메서드에서 등록한 핸들러 함수는 'emit' 메서드가 호출될 때 실행됩니다.
   * 'emit'에서 전달하는 payload의 타입과 'on'에서 등록하는 핸들러 함수의 매개변수 타입이 일치합니다.
   *
   * 예시:
   * 1. on('BOUNDS_CHANGED', (payload) => { ... })로 핸들러를 등록
   * 2. emit('BOUNDS_CHANGED', { bounds: ..., zoom: ... })가 호출되면
   * 3. 등록된 핸들러가 emit의 payload를 인자로 받아 실행됩니다.
   *
   */
  on<T extends MapEventType>(
    namespaceKey: string,
    type: T,
    handler: (payload: MapEventPayloads[T]) => void,
  ): () => void {
    const eventKey = `${namespaceKey}:${type}`

    // 해당 이벤트 타입의 구독자 집합이 없다면 생성
    if (!this.subscribers.has(eventKey)) {
      this.subscribers.set(eventKey, new Set())
    }

    // 해당 이벤트 타입의 모든 구독자 가져오기
    const handlers = this.subscribers.get(eventKey)!

    // 구독자 추가
    handlers.add(handler as (payload: MapEventPayloads[MapEventType]) => void)

    return () => {
      handlers.delete(
        handler as (payload: MapEventPayloads[MapEventType]) => void,
      )
      if (handlers.size === 0) {
        this.subscribers.delete(eventKey)
      }
    }
  }

  cleanup(): void {
    this.rafMap.forEach((rafId) => cancelAnimationFrame(rafId))
    this.rafMap.clear()
    this.subscribers.clear()
  }
}

export const mapEventBus = MapEventBus.getInstance()
