import { useState } from 'react'

import Image from 'next/image'

import { ExhibitionApiType } from '@/apis/exhibitions/types/model/map'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import { HeartBlackOffIcon, HeartSelectOnIcon } from '@/generated/icons/MyIcons'
import { cn } from '@/lib/utils'

import { STATUS_TYPE } from '../../../constants/map'

export default function MarkerInfoCard(props: ExhibitionApiType) {
  const { thumbnail, title, status, place, startDate, endDate } = props

  const formattedTitle = title.replace(/[^\w\s가-힣]/g, ' ').trim()

  const [isLiked, setIsLiked] = useState(false)

  return (
    <CarouselItem>
      <Card className="w-full">
        <CardContent className="relative flex gap-3 p-4">
          <div className="relative size-[100px]">
            <Image
              src={thumbnail || '/api/placeholder/100/100'}
              alt={formattedTitle}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <CardHeader className="p-0">
              <CardTitle className="max-w-[360px] truncate text-lg">
                {formattedTitle}
              </CardTitle>
              <span
                className={cn(
                  'absolute right-4 top-4',
                  'mobile-button-small flex h-[26px] shrink-0 items-end justify-center rounded-full border px-2 py-1 leading-none',
                  status === 'ENDED' ?
                    'border-grayscale_gray3 text-grayscale_gray3'
                  : 'border-point text-point',
                )}
              >
                {STATUS_TYPE[status]}
              </span>
              <CardDescription>
                <p className="mobile-text-small">{place}</p>
                <p className="mobile-text-small">
                  {startDate.toLocaleDateString()} ~{' '}
                  {endDate.toLocaleDateString()}
                </p>
                <p className="mobile-text-small mt-4 text-left text-point">
                  월, 화 휴무
                </p>
              </CardDescription>
            </CardHeader>
          </div>
          <button
            className="absolute bottom-4 right-4 hover:text-primary"
            onClick={() => setIsLiked((prev) => !prev)}
          >
            {isLiked ?
              <HeartSelectOnIcon width={24} height={24} />
            : <HeartBlackOffIcon width={24} height={24} />}
          </button>
        </CardContent>
      </Card>
    </CarouselItem>
  )
}
