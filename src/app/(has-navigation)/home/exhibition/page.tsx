// ExhibitionPage.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import {
  getAllExhibitions,
  getOngoingExhibitions,
  getUpcomingExhibitions,
} from '@/actions/getExhibitions'
import { PAGE_ROUTES } from '@/constants/routes'

import FilterModal from './FilterModal'

export default function ExhibitionPage() {
  const [exhibitions, setExhibitions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isOn, setIsOn] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string>('서울')

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const region = searchParams.get('region') || '서울'
        const status = searchParams.get('status') || 'ONGOING'

        let response
        if (status === 'ONGOING') {
          response = await getOngoingExhibitions(region)
        } else {
          response = await getUpcomingExhibitions(region)
        }

        setExhibitions(response.data.flat() as any[])
      } catch (error) {
        console.error('Error fetching exhibitions:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [searchParams])

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen)
  }

  const toggleSwitch = () => {
    setIsOn(!isOn)
  }

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
      <div className="fixed left-0 right-0 top-[60px] z-40 m-auto flex h-[68.5px] w-full max-w-screen-sm items-center justify-between bg-white px-[12px]">
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

        <div className="flex items-center gap-2">
          <button>
            <Image
              src="/icons/system/shuffle-black.svg"
              alt="Shuffle Icon"
              width={24}
              height={24}
            />
          </button>

          <button className="ml-2" onClick={toggleFilterModal}>
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
      <main className="min-h-screen bg-grayscale_white pt-[128.5px]">
        <div className="grid grid-cols-2 gap-4 px-4 pb-5">
          {isLoading ?
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded bg-white p-3 shadow-md">
                <Skeleton height={200} />
                <Skeleton height={20} className="my-2" />
                <Skeleton height={20} width="60%" />
              </div>
            ))
          : exhibitions.length === 0 ?
            <div className="text-gray-500">
              전시 정보를 불러오는 중입니다...
            </div>
          : exhibitions.map((exhibition, index) => (
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
                <h3 className="mb-1 text-lg font-semibold">
                  {exhibition.title}
                </h3>
                <p className="text-sm text-gray-600">{`${new Date(exhibition.startDate).toLocaleDateString()} ~ ${new Date(exhibition.endDate).toLocaleDateString()}`}</p>
                <p className="text-sm text-gray-600">{exhibition.place}</p>
              </div>
            ))
          }
        </div>
      </main>

      {/* 필터 모달 */}
      {isFilterModalOpen && (
        <FilterModal
          closeModal={toggleFilterModal}
          isOn={isOn}
          toggleSwitch={toggleSwitch}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      )}
    </>
  )
}
