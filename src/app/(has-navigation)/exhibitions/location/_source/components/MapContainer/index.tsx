'use client'

import React, { Suspense, useState } from 'react'

import { useGetGroupByAreaQuery } from '@/apis/exhibitions/location/ExhibitionsLoctionApi.query'

import Cluster from './Cluster'
import Map from './Map'

export default function MapContainer() {
  const [map, setMap] = useState<any>(null)
  const { data, error, isLoading } = useGetGroupByAreaQuery()

  return (
    <>
      <Map setMap={setMap} />
      <Suspense fallback={<div>Loading...</div>}>
        <Cluster map={map} data={data} />
      </Suspense>
    </>
  )
}
