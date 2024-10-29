'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getAllExhibitions } from '@/actions/getExhibitions'
import { PAGE_ROUTES } from '@/constants/routes'

export default function ExhibitionPage() {
  const [exhibitions, setExhibitions] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllExhibitions()
        setExhibitions(result.data.flat() as any[]) // 데이터를 플랫하게 해서 하나의 배열로 만듦
      } catch (error) {
        console.error('Error fetching exhibitions:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {/* 고정 헤더 */}
      <header className="fixed top-0 z-50 flex h-[60px] w-full max-w-screen-sm items-center justify-between border-b border-grayscale_gray2 bg-grayscale_white px-[12px]">
        <nav className="flex w-full items-center">
          <ul className="flex flex-1 gap-5">
            <li>
              <Link href={PAGE_ROUTES.NOW}>
                <span className="mobile-extra-large font-bold uppercase text-grayscale_gray3 opacity-50 transition-colors">
                  Now
                </span>
              </Link>
            </li>
            <li>
              <Link href={PAGE_ROUTES.EXHIBITION}>
                <span className="mobile-extra-large font-bold uppercase text-black transition-colors">
                  Exhibition
                </span>
              </Link>
            </li>
          </ul>

          {/* 돋보기 버튼 */}
          <button className="ml-auto">
            <Image
              src="/icons/system/search-black.svg"
              alt="Search Icon"
              width={24}
              height={24}
            />
          </button>
        </nav>
      </header>

      {/* 옵션 패널 */}
      <div className="fixed left-0 right-0 top-[60px] z-40 m-auto flex h-[68.5px] w-full max-w-screen-sm items-center justify-between border-b border-grayscale_gray2 bg-white px-[12px]">
        {/* 최신순 텍스트 */}
        <div className="mobile-title flex items-center">
          최신순
          <Image
            src="/icons/vertical-arrow/open-s.svg"
            alt="Arrow Icon"
            width={16}
            height={16}
            className="ml-1"
          />
        </div>

        {/* 오른쪽 버튼들 */}
        <div className="flex items-center gap-2">
          {/* 셔플 버튼 */}
          <button>
            <Image
              src="/icons/system/shuffle-black.svg"
              alt="Shuffle Icon"
              width={24}
              height={24}
            />
          </button>

          {/* 필터 버튼 */}
          <button className="ml-2">
            <Image
              src="/icons/system/filter-black.svg"
              alt="Filter Icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      {/* 전시 콘텐츠 */}
      <main className="min-h-screen bg-slate-500 pt-[128.5px]">
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
