'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { getAllExhibitions } from '@/actions/getExhibitions'

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
      <div className="min-h-[1000px] bg-slate-500 pt-[60px]">
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
              {/* 전시 상태 로고 */}
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
                {`${new Date(exhibition.startDate).toLocaleDateString()} ~ ${new Date(exhibition.endDate).toLocaleDateString()}`}
              </p>
              <p className="text-sm text-gray-600">{exhibition.place}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
