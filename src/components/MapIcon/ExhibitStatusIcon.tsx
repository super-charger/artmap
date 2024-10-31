import { useState } from 'react'

interface ExhibitStatusButtonProps {
  circleText: string
  topText: string
  bottomText: string
}

const ExhibitStatusButton: React.FC<ExhibitStatusButtonProps> = ({
  circleText,
  topText,
  bottomText,
}) => {
  // 상태 관리: 초기값은 모두 블랙
  const [isActive, setIsActive] = useState(false)
  // 색상 설정
  const circleBackgroundColor = isActive ? 'bg-point' : 'bg-grayscale_black'
  const circleTextColor = 'text-grayscale_white' // 항상 화이트
  const topTextColor = isActive ? 'text-point' : 'text-grayscale_black'
  const bottomTextColor = 'text-grayscale_black' // 항상 블랙
  // 클릭 핸들러
  const handleClick = () => {
    setIsActive(!isActive) // 클릭 시 상태를 반전
  }

  return (
    <div
      className="inline-flex h-[46px] cursor-pointer items-center rounded-[23px] bg-grayscale_white pl-[5px] pr-[15px]"
      onClick={handleClick} // 클릭 시 색상이 변경되도록 설정
    >
      {/* 왼쪽 원형 컨테이너 */}
      <div
        className={`flex h-[36px] w-[36px] items-center justify-center rounded-full ${circleBackgroundColor}`}
      >
        <span className={`${circleTextColor} text-lg font-bold`}>
          {circleText}
        </span>
      </div>
      {/* 오른쪽 텍스트 컨테이너 */}
      <div className="ml-[8px] flex flex-col justify-center">
        <span className={`${topTextColor} text-base font-medium`}>
          {topText}
        </span>
        <span
          className={`${bottomTextColor} whitespace-nowrap text-base font-medium`}
        >
          {bottomText}
        </span>
      </div>
    </div>
  )
}

export default ExhibitStatusButton
