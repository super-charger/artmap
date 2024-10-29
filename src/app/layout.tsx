import { ReactNode } from 'react'

import { Metadata, Viewport } from 'next'
import Script from 'next/script'

// import { GoogleAnalytics } from "@next/third-parties/googl";
import { ENV } from '@/configs/env'
import AppProvider from '@/providers/AppProvider'
import fonts from '@/theme/fonts'

import '../css/index.css'

/**
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  ...(ENV.DOMAIN && { metadataBase: new URL(ENV.DOMAIN) }),
  title: {
    default: '똑똑한개발자',
    template: `%s | 똑똑한개발자`,
  },
  description: '디지털프로덕트의 TOKTOK한 경험',
  applicationName: '똑똑한개발자',
  keywords: ['똑똑한개발자', '디지털프로덕트의 TOKTOK한 경험', '...'],
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/120.png', sizes: '120x120' },
    { rel: 'apple-touch-icon', url: '/icons/152.png', sizes: '152x152' },
    { rel: 'apple-touch-icon', url: '/icons/167.png', sizes: '167x167' },
    { rel: 'apple-touch-icon', url: '/icons/180.png', sizes: '180x180' },
    { rel: 'apple-touch-icon', url: '/icons/192.png', sizes: '192x192' },
    { rel: 'apple-touch-icon', url: '/icons/384.png', sizes: '384x384' },
    { rel: 'apple-touch-icon', url: '/icons/512.png', sizes: '512x512' },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
    },
  ],
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ko',
    siteName: '똑똑한개발자',
    title: {
      default: '똑똑한개발자',
      template: `똑똑한개발자 | %s`,
    },
    description: '디지털프로덕트의 TOKTOK한 경험',
    images: [
      {
        url: '/images/new_og.png',
        width: 600,
        height: 315,
        alt: 'Og Image Alt',
        type: 'image/png',
      },
    ],
    url: ENV.DOMAIN,
  },
  twitter: {
    card: 'summary_large_image',
    images: `/images/new_og.png`,
    title: '똑똑한개발자',
    description: '디지털프로덕트의 TOKTOK한 경험',
    site: '@site',
  },
  appleWebApp: {
    capable: true,
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
}

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts
 */
export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&libraries=services,clusterer&autoload=false`}
        />
        {/* <GoogleAnalytics gaId={ENV.GA_KEY || ""} /> */}
      </head>
      <body suppressHydrationWarning className={fonts.notoSansKR.variable}>
        {/*<MSWComponent/>*/}
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
