interface SmallButtonProps {
  text: string
  backgroundColor?: string
  textColor?: string
  border?: string // 보더 색상
}

const SmallButton: React.FC<SmallButtonProps> = ({
  text,
  backgroundColor = '',
  textColor = '',
  border = '',
}) => {
  return (
    <button
      className={`flex h-[30px] w-[88px] items-center justify-center rounded-[15px] transition duration-200 ease-in-out ${backgroundColor} ${textColor} ${border} ${
        backgroundColor === 'grayscale_black' ?
          'hover:brightness-90'
        : 'hover:brightness-110'
      } `}
    >
      {text}
    </button>
  )
}

export default SmallButton
