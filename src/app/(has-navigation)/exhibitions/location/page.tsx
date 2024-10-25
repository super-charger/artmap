import { MapStateProvider } from '@/app/_source/context/useMapStateContext'

import ExhibitionListDrawer from './_source/components/@ExhibitionList/ExhibitionListDrawer'
import FilterBar from './_source/components/@Filter/FilterBar'

export default function ExhibitionsLocationPage() {
  return (
    <MapStateProvider>
      <div className="pointer-events-auto">
        <FilterBar />
        {/* <MapContainer /> */}
        <ExhibitionListDrawer />
      </div>
    </MapStateProvider>
  )
}
