import { memo, useState } from 'react'

import Image from 'next/image'

import { ExhibitionApiType } from '@/apis/exhibitions/types/model/map'
import {
  HeartOpacityOffIcon,
  HeartOpacityOnIcon,
} from '@/generated/icons/MyIcons'
import { cn } from '@/lib/utils'

const STATUS_TYPE = {
  UPCOMING: '전시예정',
  ONGOING: '전시중',
  ENDED: '전시종료',
} as const

const ExhibitionItem = memo((props: ExhibitionApiType) => {
  const { thumbnail, title, status, place, startDate, endDate } = props

  const formattedTitle = title.replace(/[^\w\s가-힣]/g, ' ').trim()

  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="rounded-lg p-4">
      <div className="flex flex-col gap-3">
        <div className="relative aspect-[4/3] h-[200px] w-full overflow-hidden rounded-md bg-muted">
          <Image
            src={thumbnail || ''}
            alt={formattedTitle}
            fill
            className="object-cover"
          />
          <button
            className="absolute bottom-2 right-2 hover:text-primary"
            onClick={() => setIsLiked((prev) => !prev)}
          >
            {isLiked ?
              <HeartOpacityOnIcon width={24} height={24} />
            : <HeartOpacityOffIcon width={24} height={24} />}
          </button>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="mobile-title truncate text-grayscale_black">
              {formattedTitle}
            </h3>
            <span
              className={cn(
                'mobile-button-small flex h-[26px] shrink-0 items-end justify-center rounded-full border px-2 py-1 leading-none',
                status === 'ENDED' ?
                  'border-grayscale_gray3 text-grayscale_gray3'
                : 'border-point text-point',
              )}
            >
              {STATUS_TYPE[status]}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">{place}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
})

ExhibitionItem.displayName = 'ExhibitionItem'
export default ExhibitionItem
