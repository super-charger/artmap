import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

import { isValid, parse } from 'date-fns'
import { parseStringPromise } from 'xml2js'
import {cache} from "browserslist";

const prisma = new PrismaClient()

const API_KEY = process.env.CULTURE_API_KEY

if (!API_KEY) {
  throw new Error('CULTURE_API_KEY is not set in the environment variables')
}

export interface ApiResponse<T> {
  data: T
}

export async function GET() {
  try {
    await prisma.exhibition.deleteMany()

    const response = await fetch(
      `http://www.culture.go.kr/openapi/rest/publicperformancedisplays/area?from=20240801&sortStdr=3&rows=999&cPage=1&ServiceKey=${API_KEY}`,
        {
          cache: "no-cache",
        }
    )

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const xmlData = await response.text()
    const results = await parseStringPromise(xmlData)

    //  실제 전시 데이터
    const exhibitions = results.response.msgBody[0].perforList

    for (const exhibition of exhibitions) {
      const startDate = parseCustomDate(exhibition.startDate[0])
      const endDate = parseCustomDate(exhibition.endDate[0])

      if (
        isValid(startDate) &&
        isValid(endDate) &&
        exhibition.gpsX[0] &&
        exhibition.gpsY[0] //
      ) {
        await prisma.exhibition.create({
          data: {
            id: exhibition.seq[0],
            title: exhibition.title[0],
            startDate,
            endDate,
            place: exhibition.place[0],
            area: exhibition.area[0],
            thumbnail: exhibition.thumbnail[0],
            gpsX: exhibition.gpsX[0],
            gpsY: exhibition.gpsY[0],
            status: getExhibitionStatus(startDate, endDate),
          },
        })
      } else {
        console.log(
          `Skipping exhibition: ${exhibition.title[0]} - Invalid date or missing GPS data`,
        )
      }
    }

    return NextResponse.json({ message: 'Exhibitions seeded' })
  } catch (error) {
    console.log(error)
    await prisma.$disconnect()
    NextResponse.json({ message: 'Error seeding exhibitions' })
  } finally {
    await prisma.$disconnect()
  }
}

function parseCustomDate(dateString: string): Date {
  // Parse '20231011' format to Date object
  return parse(dateString, 'yyyyMMdd', new Date())
}

function getExhibitionStatus(
  startDate: Date,
  endDate: Date,
): 'UPCOMING' | 'ONGOING' | 'ENDED' {
  const now = new Date()

  if (now < startDate) return 'UPCOMING'
  if (now > endDate) return 'ENDED'
  return 'ONGOING'
}
