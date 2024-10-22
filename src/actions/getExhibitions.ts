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
    const popularExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'UPCOMING',
        area: '서울',
      },
      take: 20,
      orderBy: {
        id: 'desc',
      },
    })
    return { data: popularExhibitions }
  } catch (error) {
    console.error('Error fetching current exhibitions:', error)
    throw new Error('An error occurred while fetching exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}
