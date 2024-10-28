// pages/ExhibitionPage.tsx
'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getAllExhibitions } from '@/actions/getExhibitions'
import { LAYOUT } from '@/constants/layout'
import { PAGE_ROUTES } from '@/constants/routes'
import { cn } from '@/utils/utils'

// pages/ExhibitionPage.tsx

// pages/ExhibitionPage.tsx

export default function ExhibitionPage() {
  const [exhibitions, setExhibitions] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllExhibitions()
        setExhibitions(result.data.flat() as any[])
      } catch (error) {
        console.error('Error fetching exhibitions:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {/* 독립된 고정 헤더, NowPage와 완전히 동일한 스타일 적용 */}
      <header
        className={cn(
          `h-[${LAYOUT.HEADER.HEIGHT}]`,
          'fixed top-0 z-50 flex w-full max-w-screen-sm items-center justify-center',
          'transition-colors duration-300 ease-in-out',
          'bg-grayscale_white', // 고정된 배경색을 흰색으로 설정
        )}
      >
        <nav className="flex w-full items-center p-[12px]">
          <ul className="flex gap-5">
            <li
              className={cn(
                'mobile-extra-large font-bold uppercase text-gray-400 opacity-50',
                'text-center',
              )}
            >
              <Link href={PAGE_ROUTES.NOW}>Now</Link>
            </li>
            <li
              className={cn(
                'mobile-extra-large font-bold uppercase text-black',
                'text-center',
              )}
            >
              <Link href={PAGE_ROUTES.EXHIBITION}>Exhibition</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* 전시 콘텐츠 */}
      <main className="min-h-[1000px] bg-slate-500 pt-[80px]">
        <div className="mb-8 h-px bg-slate-500"></div>
        <div className="grid grid-cols-2 gap-4 px-4 pb-5">
          {exhibitions.length === 0 ?
            <div className="text-gray-500">
              전시 정보를 불러오는 중입니다...
            </div>
          : null}
          {exhibitions.map((exhibition, index) => (
            <div key={index} className="rounded bg-white p-3 shadow-md">
              <div className="relative mb-2 h-[200px] w-full">
                <Image
                  src={exhibition.thumbnail}
                  alt={exhibition.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <div
                className="justify-left my-1 flex"
                style={{ marginTop: '12px', marginBottom: '9px' }}
              >
                {exhibition.status === 'ONGOING' && (
                  <Image
                    src="/icons/content/exhibition-ongoing.svg"
                    alt="Ongoing Exhibition"
                    width={60}
                    height={43}
                    layout="fixed"
                  />
                )}
                {exhibition.status === 'UPCOMING' && (
                  <Image
                    src="/icons/content/exhibition-upcoming.svg"
                    alt="Upcoming Exhibition"
                    width={60}
                    height={43}
                    layout="fixed"
                  />
                )}
                {exhibition.status === 'ENDED' && (
                  <Image
                    src="/icons/content/exhibition-end.svg"
                    alt="Ended Exhibition"
                    width={60}
                    height={43}
                    layout="fixed"
                  />
                )}
              </div>
              <h3 className="mb-1 text-lg font-semibold">{exhibition.title}</h3>
              <p className="text-sm text-gray-600">
                {`${new Date(exhibition.startDate).toLocaleDateString()} ~ ${new Date(
                  exhibition.endDate,
                ).toLocaleDateString()}`}
              </p>
              <p className="text-sm text-gray-600">{exhibition.place}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
