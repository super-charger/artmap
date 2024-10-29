import { MapStateProvider } from '@/app/_source/context/useMapStateContext'
import { GlobalMapStoreProvider } from '@/stores/map/store'

import ExhibitionListDrawer from './_source/components/@Drawer/ExhibitionDrawer'
import FilterBar from './_source/components/@Filter/FilterBar'
import ExhibitionMap from './_source/components/@Map/ExhibitionMap'

export default function ExhibitionsLocationPage() {
  return (
    <GlobalMapStoreProvider>
      <MapStateProvider>
        <div className="pointer-events-auto">
          <FilterBar />
          <ExhibitionMap />
          <ExhibitionListDrawer />
        </div>
      </MapStateProvider>
    </GlobalMapStoreProvider>
  )
}
