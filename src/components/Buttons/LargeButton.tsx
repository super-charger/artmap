interface LargeButtonProps {
  text?: string
  backgroundColor?: string
  textColor?: string
  border?: string // 보더 컬러 (필요시)
}

export const LargeButton: React.FC<LargeButtonProps> = ({
  text,
  backgroundColor = '',
  textColor = '',
  border = '',
}) => {
  return (
    <button
      className={`h-[40px] w-[343px] rounded-[5px] transition duration-200 ease-in-out ${backgroundColor} ${textColor} ${border} ${
        backgroundColor === 'grayscale_black' ?
          'hover:brightness-60'
        : 'hover:brightness-110'
      } `}
    >
      {text}
    </button>
  )
}

export default LargeButton
