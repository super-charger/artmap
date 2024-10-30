import { AreaPositionType } from '@/apis/exhibitions/types/model/map'

export const MAP_MOVE_ZOOM_MIN_LEVEL = 4

export const defaultPosition = { lat: 36.5, lng: 127.5 }

export const areaCenterPosition: AreaPositionType = {
  서울: { lat: 37.5665, lng: 126.978 },
  경기: { lat: 37.2636, lng: 127.0286 },
  부산: { lat: 35.1796, lng: 129.0756 },
  대구: { lat: 35.8714, lng: 128.6014 },
  인천: { lat: 37.4563, lng: 126.7052 },
  광주: { lat: 35.1595, lng: 126.8526 },
  충남: { lat: 36.6588, lng: 126.6728 },
  울산: { lat: 35.5384, lng: 129.3114 },
  세종: { lat: 36.48, lng: 127.289 },
  대전: { lat: 36.3504, lng: 127.3845 },
  충북: { lat: 36.6357, lng: 127.4914 },
  경남: { lat: 35.4606, lng: 128.2132 },
  경북: { lat: 36.576, lng: 128.505 },
  강원: { lat: 37.8228, lng: 128.1555 },
  제주: { lat: 33.489, lng: 126.4983 },
  전북: { lat: 35.7175, lng: 127.153 },
  전남: { lat: 34.8679, lng: 126.991 },
}

// 지역 이름 변환을 위한 매핑 객체
export const AREA_NAME_MAP: Record<string, string> = {
  서울특별시: '서울',
  강원도: '강원',
  경기도: '경기',
  경상남도: '경남',
  경상북도: '경북',
  광주광역시: '광주',
  대구광역시: '대구',
  대전광역시: '대전',
  부산광역시: '부산',
  세종특별자치시: '세종',
  울산광역시: '울산',
  인천광역시: '인천',
  전라남도: '전남',
  전라북도: '전북',
  제주특별자치도: '제주',
  충청남도: '충남',
  충청북도: '충북',
} as const

export const STATUS_TYPE = {
  UPCOMING: '전시예정',
  ONGOING: '전시중',
  ENDED: '전시종료',
} as const
