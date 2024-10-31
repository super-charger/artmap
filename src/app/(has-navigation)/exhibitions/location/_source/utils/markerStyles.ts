import { ExhibitionStatus } from '@/apis/exhibitions/types/model/map'

export const STATUS_TYPE = {
  UPCOMING: '전시예정',
  ONGOING: '전시중',
  ENDED: '휴관중',
} as const

export const getStatusColorClass = (
  status: ExhibitionStatus,
  isSelected = false,
) => {
  if (isSelected) {
    return 'bg-point'
  }

  switch (status) {
    case 'ONGOING':
      return 'bg-primary'
    case 'UPCOMING':
      return 'bg-secondary'
    case 'ENDED':
      return 'bg-grayscale_gray4'
    default:
      return 'bg-primary'
  }
}

export const getTitleColorClass = (
  status: ExhibitionStatus,
  isSelected = false,
) => {
  if (isSelected) {
    return 'text-point'
  }

  switch (status) {
    case 'ONGOING':
      return 'text-primary'
    case 'UPCOMING':
      return 'text-secondary'
    case 'ENDED':
      return 'text-grayscale_gray4'
    default:
      return 'text-primary'
  }
}
