import Script from 'next/script'

/**
 * strategy="beforeInteractive" 사용 이유
 * - 각 페이지마다 스크립트를 중복 로드하는 것을 방지하기 위해.
 * - 아트맵 프로젝트에 지도를 사용하기 경우가 두페이지 정도 보여집니다.
 * - 각 페이지 별로 스크립트를 넣기보다는 공통으로 사용하기 위해 레이아웃에 넣었습니다.
 * - 페이지 인터렉션이 시작되기 전에 카카오 SDK가 로드됩니다.
 */

const KakaoMapScript = () => {
  return (
    <>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&libraries=services,clusterer&autoload=false`}
      />
    </>
  )
}

export default KakaoMapScript
