interface ExhibitVenueCountButtonProps {
  topText: string // 상단 텍스트 (지역 이름)
  bottomText: string // 하단 텍스트 (전시회 개수)
  backgroundColor?: string
  textColor?: string
}

const ExhibitVenueCountButton: React.FC<ExhibitVenueCountButtonProps> = ({
  topText,
  bottomText,
  backgroundColor = 'bg-grayscale_gray5', // 기본 배경색 (회색)
  textColor = 'text-grayscale_white', // 기본 텍스트 색상 (화이트)
}) => {
  return (
    <button
      className={`flex h-[82px] w-[82px] flex-col items-center justify-center rounded-full ${backgroundColor} ${textColor} transition duration-200 ease-in-out hover:brightness-110`}
    >
      <span className="text-lg font-bold">{topText}</span>
      <span className="text-md mt-1 font-medium">{bottomText}</span>
    </button>
  )
}

export default ExhibitVenueCountButton
