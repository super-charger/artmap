import React from 'react'

import { ExhibitionApiType } from '@/apis/exhibitions/types/model/map'
import { useMapStateContext } from '@/app/_source/context/useMapStateContext'
import { Carousel, CarouselContent } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface MarkerInfoCarouselProps {
  renderItem: (selectedExhibition: ExhibitionApiType) => React.ReactNode
}

export default function MarkerInfoCarousel({
  renderItem,
}: MarkerInfoCarouselProps) {
  const selectedExhibition = useMapStateContext(
    (state) => state.selectedExhibition,
  )

  return (
    <div
      className={cn(
        'fixed bottom-[120px] z-0 mx-auto w-full max-w-screen-sm px-4 py-5 opacity-0',
        {
          'z-10 opacity-100': selectedExhibition,
        },
      )}
    >
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent className="h-[130px]">
          {selectedExhibition?.map((item) => renderItem(item))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
