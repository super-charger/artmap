/*
  Warnings:

  - Added the required column `districtId` to the `Exhibition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exhibition" ADD COLUMN     "districtId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AdminDistrict" (
    "id" TEXT NOT NULL,
    "sido" TEXT NOT NULL,
    "sigungu" TEXT NOT NULL,
    "gpsX" DECIMAL(10,7) NOT NULL,
    "gpsY" DECIMAL(10,7) NOT NULL,
    "bounds" JSONB NOT NULL,
    "code" TEXT NOT NULL,
    "subCode" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminDistrict_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdminDistrict_sido_idx" ON "AdminDistrict"("sido");

-- CreateIndex
CREATE INDEX "AdminDistrict_gpsX_gpsY_idx" ON "AdminDistrict"("gpsX", "gpsY");

-- CreateIndex
CREATE INDEX "AdminDistrict_level_idx" ON "AdminDistrict"("level");

-- CreateIndex
CREATE UNIQUE INDEX "AdminDistrict_sido_sigungu_key" ON "AdminDistrict"("sido", "sigungu");

-- CreateIndex
CREATE INDEX "Exhibition_status_idx" ON "Exhibition"("status");

-- CreateIndex
CREATE INDEX "Exhibition_startDate_endDate_idx" ON "Exhibition"("startDate", "endDate");

-- CreateIndex
CREATE INDEX "Exhibition_gpsX_gpsY_idx" ON "Exhibition"("gpsX", "gpsY");

-- CreateIndex
CREATE INDEX "Exhibition_area_idx" ON "Exhibition"("area");

-- CreateIndex
CREATE INDEX "Exhibition_districtId_idx" ON "Exhibition"("districtId");

-- AddForeignKey
ALTER TABLE "Exhibition" ADD CONSTRAINT "Exhibition_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "AdminDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
