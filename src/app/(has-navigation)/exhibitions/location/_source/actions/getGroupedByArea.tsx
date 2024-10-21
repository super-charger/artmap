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
    return groupedByArea
  } catch (error) {
    console.error('Error grouping exhibitions by area:', error)
    throw new Error('An error occurred while grouping exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}
