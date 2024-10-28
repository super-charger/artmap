'use server'

import prisma from '@/apis/prismaClient'

export async function getOngoingExhibitions() {
  try {
    const popularExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'ONGOING',
        area: '서울',
      },
      take: 20,
      orderBy: {
        id: 'asc',
      },
    })
    console.log(popularExhibitions)
    return { data: popularExhibitions }
  } catch (error) {
    console.error('Error fetching current exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}

export async function getUpcomingExhibitions() {
  try {
    const upcomingExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'UPCOMING',
        area: '서울',
      },
      take: 20,
      orderBy: {
        id: 'desc',
      },
    })
    console.log(upcomingExhibitions)
    return { data: upcomingExhibitions }
  } catch (error) {
    console.error('Error fetching current exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllExhibitions() {
  try {
    const popularExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'ONGOING',
        area: '서울',
      },
      take: 20,
      orderBy: {
        id: 'desc',
      },
    })

    const upcomingExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'UPCOMING',
        area: '서울',
      },
      take: 20,
      orderBy: {
        id: 'asc',
      },
    })

    const endExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'ENDED',
        area: '서울',
      },
      take: 20,
      orderBy: {
        id: 'desc',
      },
    })

    const allData: any[] = []
    allData.push(popularExhibitions, upcomingExhibitions, endExhibitions)
    return { data: allData }
  } catch (error) {
    console.error('Error fetching current exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}
