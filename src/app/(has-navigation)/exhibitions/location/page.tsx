import { MapStateProvider } from '@/app/_source/context/useMapStateContext'

import FilterBar from './_source/components/@Filter/FilterBar'
import MapContainer from './_source/components/@MapContainer'

export default function ExhibitionsLocationPage() {
  return (
    <MapStateProvider>
      <FilterBar />
      <MapContainer />
    </MapStateProvider>
  )
}
