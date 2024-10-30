import { useEffect, useRef } from 'react'

import { MARKER_CONSTANTS } from '../types/map'

export const useMarkerImage = () => {
  const markerImageRef = useRef<kakao.maps.MarkerImage>()

  useEffect(() => {
    if (!markerImageRef.current) {
      markerImageRef.current = new kakao.maps.MarkerImage(
        MARKER_CONSTANTS.DEFAULT_IMAGE.PATH,
        new kakao.maps.Size(
          MARKER_CONSTANTS.DEFAULT_IMAGE.SIZE.width,
          MARKER_CONSTANTS.DEFAULT_IMAGE.SIZE.height,
        ),
        {
          offset: new kakao.maps.Point(
            MARKER_CONSTANTS.DEFAULT_IMAGE.OFFSET.x,
            MARKER_CONSTANTS.DEFAULT_IMAGE.OFFSET.y,
          ),
        },
      )
    }

    return () => {
      markerImageRef.current = undefined
    }
  }, [])

  return markerImageRef.current
}
