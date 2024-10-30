'use server'

import prisma from '@/apis/prismaClient'

// 진행 중인 전시 가져오기
export async function getOngoingExhibitions(region: string = '서울') {
  try {
    const popularExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'ONGOING',
        area: region,
      },
      take: 20,
      orderBy: {
        id: 'asc',
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        place: true,
        area: true,
        thumbnail: true,
        status: true,
        likes: {
          select: {
            id: true,
          },
        },
        visits: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        // gpsX와 gpsY는 가져오지 않음
      },
    })
    return { data: popularExhibitions }
  } catch (error) {
    console.error('Error fetching ongoing exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}

// 다가오는 전시 가져오기
export async function getUpcomingExhibitions(region: string = '서울') {
  try {
    const upcomingExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'UPCOMING',
        area: region,
      },
      take: 20,
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        place: true,
        area: true,
        thumbnail: true,
        status: true,
        likes: {
          select: {
            id: true,
          },
        },
        visits: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        // gpsX와 gpsY는 가져오지 않음
      },
    })
    return { data: upcomingExhibitions }
  } catch (error) {
    console.error('Error fetching upcoming exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}

// 모든 전시 가져오기
export async function getAllExhibitions(region: string = '서울') {
  try {
    const popularExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'ONGOING',
        area: region,
      },
      take: 20,
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        place: true,
        area: true,
        thumbnail: true,
        status: true,
        likes: {
          select: {
            id: true,
          },
        },
        visits: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        // gpsX와 gpsY는 가져오지 않음
      },
    })

    const upcomingExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'UPCOMING',
        area: region,
      },
      take: 20,
      orderBy: {
        id: 'asc',
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        place: true,
        area: true,
        thumbnail: true,
        status: true,
        likes: {
          select: {
            id: true,
          },
        },
        visits: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        // gpsX와 gpsY는 가져오지 않음
      },
    })

    const endExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'ENDED',
        area: region,
      },
      take: 20,
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        place: true,
        area: true,
        thumbnail: true,
        status: true,
        likes: {
          select: {
            id: true,
          },
        },
        visits: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        // gpsX와 gpsY는 가져오지 않음
      },
    })

    const allData: any[] = []
    allData.push(popularExhibitions, upcomingExhibitions, endExhibitions)
    return { data: allData }
  } catch (error) {
    console.error('Error fetching all exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}
