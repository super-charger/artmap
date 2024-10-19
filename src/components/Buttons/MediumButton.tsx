import Image from 'next/image'

interface MediumButtonProps {
  text: string
  backgroundColor?: string
  textColor?: string
  border?: string
  iconSrc?: string
}

const MediumButton: React.FC<MediumButtonProps> = ({
  text,
  backgroundColor = '',
  textColor = '',
  border = '',
  iconSrc = '',
}) => {
  return (
    <button
      className={`flex h-[40px] w-[165px] items-center justify-center gap-1.5 rounded-[5px] transition duration-200 ease-in-out ${backgroundColor} ${textColor} ${border} ${
        backgroundColor === 'grayscale_black' ?
          'hover:brightness-60'
        : 'hover:brightness-110'
      } `}
    >
      {text}
      {iconSrc && <Image src={iconSrc} alt="" width={'10'} height={'10'} />}
    </button>
  )
}

export default MediumButton
