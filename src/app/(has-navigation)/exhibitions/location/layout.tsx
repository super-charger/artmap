import React from 'react'

import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: '전시 위치',
}

export default function ExhibitionsLocationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="m-auto min-h-screen w-full min-w-80 max-w-screen-sm">
        <div className={'w-full min-w-full'}>{children}</div>
      </div>
    </>
  )
}
