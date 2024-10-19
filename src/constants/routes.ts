import {
  TabArtOffIcon,
  TabArtOnIcon,
  TabCuratorOffIcon,
  TabCuratorOnIcon,
  TabHomeOffIcon,
  TabHomeOnIcon,
  TabMapOffIcon,
  TabMapOnIcon,
  TabMypageOffIcon,
  TabMypageOnIcon,
} from '@/generated/icons/MyIcons'

export const PAGE_ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
  NOW: '/home/now',
  EXHIBITION: '/home/exhibition',
  ARTWORKS: '/artworks',
  ARTWORKS_DETAIL: '/artworks/:id',
  EXHIBITIONS_LOCATION: '/exhibitions/location',
  CURATOR: '/curator',
  MY_PAGE: '/mypage',
} as const

export const API_ROUTES = {
  ME: 'api/auth/me',
  USER: 'api/users/:id?',
} as const

export const HEADER_ROUTES = {} as const

export const WHITE_LIST = [
  PAGE_ROUTES.HOME,
  // ...
]

export const navs = [
  {
    label: '홈',
    pathname: PAGE_ROUTES.HOME,
    icon: TabHomeOffIcon,
    activeIcon: TabHomeOnIcon,
  },
  {
    label: '작품정보',
    pathname: PAGE_ROUTES.ARTWORKS,
    icon: TabArtOffIcon,
    activeIcon: TabArtOnIcon,
  },
  {
    label: '내주변전시',
    pathname: PAGE_ROUTES.EXHIBITIONS_LOCATION,
    icon: TabMapOffIcon,
    activeIcon: TabMapOnIcon,
  },
  {
    label: '큐레이터픽',
    pathname: PAGE_ROUTES.CURATOR,
    icon: TabCuratorOffIcon,
    activeIcon: TabCuratorOnIcon,
  },
  {
    label: '마이페이지',
    pathname: PAGE_ROUTES.MY_PAGE,
    icon: TabMypageOffIcon,
    activeIcon: TabMypageOnIcon,
  },
]

export const headers = [
  {
    label: 'now',
    pathname: PAGE_ROUTES.NOW,
  },
  {
    label: 'exhibition',
    pathname: PAGE_ROUTES.EXHIBITION,
  },
]
