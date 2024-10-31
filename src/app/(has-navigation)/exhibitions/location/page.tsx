import { Suspense } from 'react'

import { MapStateProvider } from '@/app/_source/context/useMapStateContext'
import { GlobalMapStoreProvider } from '@/stores/map/store'

import ExhibitionListDrawer from './_source/components/@Drawer/ExhibitionDrawer'
import FilterBar from './_source/components/@Filter/FilterBar'
import ExhibitionMap from './_source/components/@Map/ExhibitionMap'
import { MapSkeleton } from './_source/components/@Map/MapSkeleton'

export default function ExhibitionsLocationPage() {
  return (
    <GlobalMapStoreProvider>
      <MapStateProvider>
        <div className="pointer-events-auto">
          <Suspense fallback={<MapSkeleton />}>
            <FilterBar />
            <ExhibitionMap />
            <ExhibitionListDrawer />
          </Suspense>
        </div>
      </MapStateProvider>
    </GlobalMapStoreProvider>
  )
}
