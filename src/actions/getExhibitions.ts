'use server'

import prisma from '@/apis/prismaClient'

export async function getPopularExhibitions() {
  try {
    const popularExhibitions = await prisma.exhibition.findMany({
      where: {
        status: 'ONGOING',
        area: '서울',
      },
      take: 10,
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
