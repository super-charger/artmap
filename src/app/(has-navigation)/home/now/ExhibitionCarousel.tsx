'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

// ExhibitionCarousel 임포트 추가
import { getPopularExhibitions } from '@/actions/getExhibitions'
import { MY_IMAGES } from '@/generated/path/images'

import ExhibitionCarousel from './ExhibitionCarousel'

// 데이터 fetching 함수 임포트

interface Slide {
  background: string
  imageSrc: string
  title: string
  date: string
  place: string
}

export default function NowPage() {
  // 슬라이드 상태를 관리하는 상태값
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [indicatorPosition, setIndicatorPosition] = useState<'left' | 'right'>(
    'left',
  )

  // 전시 데이터 상태 선언
  const [exhibitions, setExhibitions] = useState<any[]>([])

  useEffect(() => {
    // API 요청으로 전시 정보를 가져옴
    async function fetchData() {
      const { data } = await getPopularExhibitions()
      setExhibitions(data)
    }
    fetchData()
  }, [])

  // 슬라이드 데이터 정의
  const slides: Slide[] = [
    {
      background: 'bg-now_poster1_background',
      imageSrc: MY_IMAGES.HOME_NOW_POSTER_1.src,
      title: 'Terrarium',
      date: '2021.08.17 ~ 2021.09.09',
      place: '중간지점',
    },
    {
      background: 'bg-now_poster2_background',
      imageSrc: MY_IMAGES.HOME_NOW_POSTER_2.src,
      title: '슈퍼픽션',
      date: '2021.08.17 ~ 2021.09.09',
      place: '세화미술관',
    },
  ]

  // 슬라이드 이동 함수
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIndicatorPosition('right')
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIndicatorPosition('left')
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 상단 섹션: 배경 이미지와 가운데 정렬된 내용 */}
      <div
        className={`relative flex h-[642px] w-full items-center justify-center ${slides[currentSlide].background}`}
        onClick={(e) => {
          const { left, width } = e.currentTarget.getBoundingClientRect()
          const clickX = e.clientX - left
          const center = width / 2
          // 현재 슬라이드 상태에 따라 클릭 가능 영역 설정
          if (currentSlide === 0 && clickX > center) {
            goToNextSlide()
          } else if (currentSlide === 1 && clickX < center) {
            goToPrevSlide()
          }
        }}
      >
        {/* 이미지와 텍스트를 감싸는 컨테이너 */}
        <div className="relative">
          {/* 이미지 컴포넌트 */}
          <Image
            src={slides[currentSlide].imageSrc}
            alt="image"
            height={430}
            width={300}
          />
          {/* 어두운 그라데이션 오버레이 (이미지 아래쪽 3분의 1을 어둡게 처리) */}
          <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-gray-800 to-transparent"></div>
          {/* 텍스트 라벨 그룹 (이미지 위에 위치, 왼쪽 아래에 배치) */}
          <div className="absolute bottom-[10px] left-[10px] flex flex-col text-white">
            {/* 첫 번째 라벨: Mobile Extra Large - Bold 적용 */}
            <div className="mobile-extra-large font-bold">
              {slides[currentSlide].title}
            </div>
            {/* 두 번째 라벨: Mobile Text */}
            <div className="mobile-text">{slides[currentSlide].date}</div>
            {/* 세 번째 라벨: Mobile Title */}
            <div className="mobile-title">{slides[currentSlide].place}</div>
          </div>
        </div>
      </div>
      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-[75px] left-1/2 h-[3px] w-[300px] -translate-x-1/2 transform rounded-full bg-gray-400">
        <div
          className="h-full rounded-full bg-white transition-all duration-500 ease-in-out"
          style={{
            width: '50%',
            transform:
              indicatorPosition === 'left' ? 'translateX(0)' : (
                'translateX(100%)'
              ),
          }}
        ></div>
      </div>

      {/* Exhibition Carousel 추가 */}
      {exhibitions.length > 0 && (
        <ExhibitionCarousel exhibitions={exhibitions} />
      )}
    </div>
  )
}
