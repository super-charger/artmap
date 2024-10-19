import { useState } from 'react'

import Image from 'next/image'

interface LocationPinButtonProps {
  offImageSrc: string
  onImageSrc: string
}

const LocationPinButton: React.FC<LocationPinButtonProps> = ({
  offImageSrc,
  onImageSrc,
}) => {
  const [isOn, setIsOn] = useState(false)

  const togglePin = () => {
    setIsOn(!isOn)
  }

  return (
    <button onClick={togglePin} className="h-[42px] w-[33px]">
      <Image
        src={isOn ? onImageSrc : offImageSrc}
        alt="Location Pin Button"
        width={33}
        height={42}
      />
    </button>
  )
}

export default LocationPinButton
