'use client'

import React from 'react'

import { ExhibitionApiType } from '@/apis/exhibitions/types/model/map'

import { useVisibleElements } from '../../hooks/useVisibleElements'
import ExhibitionItem from './ExhibitionItem'
import ExhibitionSkeleton from './ExhibitionSkeleton'

// TODO: 무한스크롤
const ExhibitionList = () => {
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

export default React.memo(ExhibitionList)
