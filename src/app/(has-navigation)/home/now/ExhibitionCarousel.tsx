import Image from 'next/image'

interface ExhibitionCarouselProps {
  exhibitions: any[]
  children: React.ReactNode // 전시 분류 텍스트 (예: "진행 중인 전시", "다가오는 전시")
}

export default function ExhibitionCarousel({
  exhibitions,
  children,
}: ExhibitionCarouselProps) {
  // 날짜 형식을 "YYYY.MM.DD"로 변환하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  }

  return (
    <div className="mb-10">
      {/* 전시 분류 텍스트 */}
      <div className="mobile-title-large mb-2 text-black">{children}</div>

      {/* 전시 이미지 목록 */}
      <div className="flex space-x-7 overflow-x-scroll py-4">
        {exhibitions && exhibitions.length > 0 ?
          exhibitions.map((exhibition: any, index: any) => (
            <div key={index} className="min-w-[200px] flex-shrink-0">
              {/* 전시 이미지 */}
              <div className="relative h-[200px] w-full">
                <Image
                  src={exhibition.thumbnail}
                  alt={exhibition.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {/* 전시 텍스트 정보 */}
              <div className="mt-3 text-black">
                {/* 전시 제목 */}
                <div className="mobile-title font-bold">{exhibition.title}</div>
                {/* 전시 날짜 */}
                <div className="mobile-text-small text-gray-600">
                  {`${formatDate(exhibition.startDate)} ~ ${formatDate(exhibition.endDate)}`}
                </div>
                {/* 전시 장소 */}
                <div className="mobile-title-small font-semibold text-gray-800">
                  {exhibition.place}
                </div>
              </div>
            </div>
          ))
        : <div className="text-gray-500">전시 정보를 불러오는 중입니다...</div>}
      </div>
    </div>
  )
}
