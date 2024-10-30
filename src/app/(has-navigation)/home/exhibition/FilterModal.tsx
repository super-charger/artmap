'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface ExhibitionFilterModalProps {
  closeModal: () => void
  isOn: boolean
  toggleSwitch: () => void
  selectedRegion: string
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>
}

const FilterModal = ({
  closeModal,
  isOn,
  toggleSwitch,
  selectedRegion,
  setSelectedRegion,
}: ExhibitionFilterModalProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // 모달이 열릴 때 애니메이션을 위해 처음 상태 설정
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 10)
  }, [])

  // Escape 키를 눌러 모달을 닫는 이벤트 추가
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        initiateClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // 모달 닫기 애니메이션 시작 함수
  const initiateClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      closeModal()
    }, 150) // 닫힐 때 애니메이션 시간 설정 (150ms)
  }

  // 필터 적용 함수
  const applyFilters = () => {
    // 필터 적용 후 쿼리 스트링 업데이트
    const query = new URLSearchParams()
    if (selectedRegion !== '전체') {
      query.set('region', selectedRegion)
    }
    // 전시중 버튼이 off이면 status를 UPCOMING_AND_ENDED으로 설정
    if (!isOn) {
      query.set('status', 'UPCOMING_AND_ENDED')
    } else {
      query.set('status', 'ONGOING')
    }
    router.push(`?${query.toString()}`)
    initiateClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      {/* 모달 본체 */}
      <div
        className={cn(
          'w-full max-w-screen-sm rounded-t-[20px] bg-white transition-transform ease-in-out',
          isClosing ? 'translate-y-full duration-150'
          : isOpen ? 'translate-y-0 duration-300'
          : 'translate-y-full',
          !isClosing && 'animate-slide-up-from-50',
        )}
      >
        {/* 모달 헤더 */}
        <div className="flex h-[70px] items-center justify-between border-b border-grayscale_gray2 px-[20px]">
          <span className="mobile-title-large w-full text-center">
            필터 설정
          </span>
          <button className="absolute right-[16px]" onClick={initiateClose}>
            <Image
              src="/icons/system/xicon-m-gray3.svg"
              alt="Close Icon"
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* 전시중 */}
        <div className="flex h-[70px] items-center justify-between border-b border-grayscale_gray2 pl-[20px] pr-[10px]">
          <span className="mobile-title">전시중</span>
          <button className="mr-[18px]" onClick={toggleSwitch}>
            <Image
              src={isOn ? '/icons/toggle/on.svg' : '/icons/toggle/off.svg'}
              alt="Toggle Switch"
              width={50}
              height={30}
            />
          </button>
        </div>

        {/* 지역 */}
        <div className="flex flex-col border-b border-grayscale_gray2 py-[16px] pl-[20px] pr-[10px]">
          <span className="mobile-title mb-4">지역</span>
          <div className="flex flex-wrap gap-[10px]">
            {[
              '전체',
              '서울',
              '경기',
              '인천',
              '광주',
              '대전',
              '세종',
              '울산',
              '대구',
              '부산',
              '강원',
              '제주',
            ].map((region) => (
              <button
                key={region}
                className={cn(
                  'mobile-button-small h-[30px] w-[53px] rounded-[15px]',
                  selectedRegion === region ?
                    'bg-black text-white'
                  : 'border border-grayscale_gray2 bg-white text-grayscale_gray4',
                )}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* 찾아보기 버튼 */}
        <div className="flex h-[150px] items-center px-[18px] pb-14">
          <button
            className="mobile-button h-[50px] w-full rounded bg-black text-white"
            onClick={applyFilters}
          >
            찾아보기
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterModal
