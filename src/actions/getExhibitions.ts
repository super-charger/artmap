// getExhibitions.ts
'use server'

import prisma from '@/apis/prismaClient'

// getExhibitions.ts

// 진행 중인 전시 가져오기
export async function getOngoingExhibitions(region: string) {
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
    })
    console.log(popularExhibitions)
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
    })
    console.log(upcomingExhibitions)
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
    const filterRegion = region === '전체' ? undefined : region // 전체일 경우 undefined로 설정하여 모든 지역 포함

    const popularExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'ONGOING',
        area: filterRegion, // undefined일 경우 모든 지역
      },
      take: 20,
      orderBy: {
        id: 'desc',
      },
    })

    const upcomingExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'UPCOMING',
        area: filterRegion, // undefined일 경우 모든 지역
      },
      take: 20,
      orderBy: {
        id: 'asc',
      },
    })

    const endExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'ENDED',
        area: filterRegion, // undefined일 경우 모든 지역
      },
      take: 20,
      orderBy: {
        id: 'desc',
      },
    })

    const allData = [
      ...popularExhibitions,
      ...upcomingExhibitions,
      ...endExhibitions,
    ]

    return { data: allData }
  } catch (error) {
    console.error('Error fetching all exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}

// 모든 지역에서 다가오는 전시 가져오기
export async function getAllUpcomingExhibitions() {
  try {
    const regions = [
      '서울',
      '경기',
      '인천',
      '광주',
      '대전',
      '세종',
      '울산',
      '대구',
      '부산',
      '강원',
      '제주',
    ]

    // 각 지역에서 UPCOMING 전시 가져오기
    const upcomingExhibitionsPromises = regions.map((region) =>
      prisma.exhibition.findMany({
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
        },
      }),
    )

    // 모든 UPCOMING 전시 결과를 한 배열에 병합
    const upcomingExhibitionsArray = await Promise.all(
      upcomingExhibitionsPromises,
    )
    const allUpcomingExhibitions = upcomingExhibitionsArray.flat()

    return { data: allUpcomingExhibitions }
  } catch (error) {
    console.error('Error fetching all upcoming exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}
