import { MapStateProvider } from '@/app/_source/context/useMapStateContext'

import LocationDrawer from './_source/components/@ExhibitionList/LocationDrawer'
import FilterBar from './_source/components/@Filter/FilterBar'
import MapContainer from './_source/components/@MapContainer/MapContainer'

export default function ExhibitionsLocationPage() {
  return (
    <MapStateProvider>
      <div className="pointer-events-auto">
        <FilterBar />
        {/* <MapContainer /> */}
        <LocationDrawer />
      </div>
    </MapStateProvider>
  )
}
