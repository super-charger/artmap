'use server'

import prisma from '@/apis/prismaClient'

export async function getAnalyzeImages(){
    try{
        const imageData = await prisma.exhibition.findMany({
            take:20,
        })
        return {data:imageData}
    } catch (error){
        console.error('Error 이미지 분석 fetch 실패:', error)
        throw new Error('An error occurred while fetching exhibitions')
    } finally {
        await prisma.$disconnect()
    }
}