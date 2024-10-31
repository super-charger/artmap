import { ExhibitionStatus } from '@/apis/exhibitions/types/model/map'

import {
  STATUS_TYPE,
  getStatusColorClass,
  getTitleColorClass,
} from '../../../utils/markerStyles'

export const createMarkerContent = (
  marker: {
    count: number
    place: string
    status: ExhibitionStatus
    isSelected?: boolean
  },
  onClick: () => void,
) => {
  const content = document.createElement('div')

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    onClick()

    // 클릭된 마커의 스타일 업데이트
    const markerElement = content.querySelector('.marker-container')
    const statusBadge = content.querySelector('.status-badge')
    const statusText = content.querySelector('.status-text')

    if (markerElement && statusBadge && statusText) {
      const newColorClass = getStatusColorClass(marker.status, true)
      const newTitleClass = getTitleColorClass(marker.status, true)

      statusBadge.className = `flex items-center justify-center w-9 h-9 ${newColorClass} rounded-full`
      statusText.className = `${newTitleClass}`
    }
  }

  const statusColorClass = getStatusColorClass(marker.status, marker.isSelected)
  const titleColorClass = getTitleColorClass(marker.status, marker.isSelected)

  content.innerHTML = `
    <div class="marker-container relative flex items-center bg-grayscale_white rounded-[23px] w-full h-full py-1 px-2 gap-2 cursor-pointer">
      <div class="status-badge flex items-center justify-center w-9 h-9 ${statusColorClass} rounded-full">
        <span class="mobile-title-large text-grayscale_white font-bold">${marker.count}</span>
      </div>
      <div class="mobile-title-small text-primary_black flex flex-col">
        <span class="status-text ${titleColorClass}">${STATUS_TYPE[marker.status]}</span>
        <span class="mobile-title-small font-bold">${marker.place}</span>
      </div>
    </div>
  `

  content.addEventListener('click', handleClick)

  return {
    element: content,
    cleanup: () => content.removeEventListener('click', handleClick),
  }
}
