export const getDistance = (
  pos1: kakao.maps.LatLng,
  pos2: kakao.maps.LatLng,
) => {
  const lat1 = pos1.getLat(),
    lng1 = pos1.getLng()
  const lat2 = pos2.getLat(),
    lng2 = pos2.getLng()
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2)) * 111000
}
