'use server'

import prisma from '@/apis/prismaClient'

export async function getGroupedByArea() {
  try {
    const groupedByArea = await prisma.exhibition.groupBy({
      by: ['area'],
      _count: {
        id: true,
      },
    })
    const data = groupedByArea.map((row) => {
      const position = areaCenterCoordinates[row.area] || defaultPosition
      return {
        ...row,
        position,
      }
    })

    return data
  } catch (error) {
    console.error('Error grouping exhibitions by area:', error)
    throw new Error('An error occurred while grouping exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}

interface AreaCoordinates {
  [key: string]: { lat: number; lng: number }
}

const defaultPosition = { lat: 36.5, lng: 127.5 } // 한국의 대략적인 중심 좌표

const areaCenterCoordinates: AreaCoordinates = {
  서울: { lat: 37.5665, lng: 126.978 },
  경기: { lat: 37.2636, lng: 127.0286 },
  부산: { lat: 35.1796, lng: 129.0756 },
  대구: { lat: 35.8714, lng: 128.6014 },
  인천: { lat: 37.4563, lng: 126.7052 },
  광주: { lat: 35.1595, lng: 126.8526 },
  충남: { lat: 36.6588, lng: 126.6728 },
  울산: { lat: 35.5384, lng: 129.3114 },
  세종: { lat: 36.48, lng: 127.289 },
  대전: { lat: 36.3504, lng: 127.3845 },
  충북: { lat: 36.6357, lng: 127.4914 },
  경남: { lat: 35.4606, lng: 128.2132 },
  경북: { lat: 36.576, lng: 128.505 },
  강원: { lat: 37.8228, lng: 128.1555 },
  제주: { lat: 33.489, lng: 126.4983 },
  전북: { lat: 35.7175, lng: 127.153 },
  전남: { lat: 34.8679, lng: 126.991 },
}
