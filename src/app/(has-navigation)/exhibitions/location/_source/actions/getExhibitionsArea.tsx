'use server'

import prisma from '@/apis/prismaClient'

export async function getExhibitionsArea() {
  try {
    const seoulExhibitions = await prisma.exhibition.findMany({
      where: {
        area: '서울',
      },
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
      take: 182,
    })

    const otherExhibitions = await prisma.exhibition.findMany({
      where: {
        area: {
          not: '서울',
        },
      },
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

    return [...seoulExhibitions, ...otherExhibitions]
  } catch (error) {
    console.error('Error fetching exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}
