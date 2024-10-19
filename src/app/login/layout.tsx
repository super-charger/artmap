import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그인',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
