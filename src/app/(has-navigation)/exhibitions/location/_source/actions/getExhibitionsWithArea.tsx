'use server'

import { OverlayApiType } from '@/apis/exhibitions/types/model/map'
import prisma from '@/apis/prismaClient'

import { areaCenterPosition, defaultPosition } from '../constants/map'

export async function getExhibitionsWithArea() {
  try {
    // 모든 전시 데이터 가져오기
    const exhibitions = await prisma.exhibition.findMany({
      select: {
        id: true,
        title: true,
        gpsX: true,
        gpsY: true,
        thumbnail: true,
        area: true,
        startDate: true,
        endDate: true,
        place: true,
        status: true,
      },
    })

    // 지역별 그룹
    const groupedByArea = exhibitions.reduce(
      (acc, exhibition) => {
        const area = exhibition.area
        if (!acc[area]) {
          acc[area] = {
            area,
            count: 0,
            position: areaCenterPosition[area] || defaultPosition,
          }
        }
        acc[area].count++
        return acc
      },
      {} as Record<string, OverlayApiType>,
    )

    return {
      exhibitions,
      areaGroups: Object.values(groupedByArea),
    }
  } catch (error) {
    console.error('Error fetching exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}
