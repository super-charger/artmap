import { ExhibitionApiType } from '@/apis/exhibitions/types/model/map'

import { useVisibleElements } from '../../hooks/useVisibleElements'
import ExhibitionSkeleton from './\bExhibitionSkeleton'
import ExhibitionItem from './ExhibitionItem'

// TODO: 무한스크롤
export default function ExhibitionList() {
  const {
    visibleElements: { exhibitions },
    isLoading,
    isError,
  } = useVisibleElements()

  if (isError) {
    return <div className="text-red-500">Error loading exhibitions</div>
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <ExhibitionSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {exhibitions.map((exhibition) => (
        <ExhibitionItem
          key={exhibition.id}
          // TODO: tRPC
          {...(exhibition as ExhibitionApiType)}
        />
      ))}
    </div>
  )
}
