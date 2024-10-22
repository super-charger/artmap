import { MapStateProvider } from '@/app/_source/context/useMapStateContext'

import MapContainer from './_source/components/MapContainer'

export default function ExhibitionsLocationPage() {
  return (
    <MapStateProvider>
      <MapContainer />
    </MapStateProvider>
  )
}
