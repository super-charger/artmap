import { ExhibitionApiType } from '@/apis/exhibitions/types/model/map'

import { useVisibleElements } from '../../hooks/useVisibleElements'
import ExhibitionSkeleton from './ExhibitionSkeleton'
import ExhibitionItem from './ExhibitionItem'

export default function ExhibitionList() {
  const {
    visibleElements: { exhibitions },
    isLoading,
    error,
  } = useVisibleElements()

  if (error) {
    return (
      <div className="text-red-500">
        Error loading exhibitions: {error.message}
      </div>
    )
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
