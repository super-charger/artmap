'use server'

import prisma from '@/apis/prismaClient'

export async function getExhibitionsArea() {
  try {
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
    return exhibitions
  } catch (error) {
    console.error('Error grouping exhibitions by area:', error)
    throw new Error('An error occurred while grouping exhibitions')
  } finally {
    await prisma.$disconnect()
  }
}
