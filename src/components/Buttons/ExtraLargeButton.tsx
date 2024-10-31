interface ExtraLargeButtonProps {
  text?: string
  backgroundColor?: string
  textColor?: string
  border?: string // 보더 컬러 (필요시)
}

export const ExtraLargeButton: React.FC<ExtraLargeButtonProps> = ({
  text,
  backgroundColor = '',
  textColor = '',
  border = '',
}) => {
  return (
    <button
      className={`h-[50px] w-[343px] rounded-[5px] transition duration-200 ease-in-out ${backgroundColor} ${textColor} ${border} ${
        backgroundColor === 'grayscale_black' ?
          'hover:brightness-60'
        : 'hover:brightness-110'
      } `}
    >
      {text}
    </button>
  )
}

export default ExtraLargeButton
