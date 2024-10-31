/*
  Warnings:

  - You are about to drop the column `districtId` on the `Exhibition` table. All the data in the column will be lost.
  - You are about to drop the `AdminDistrict` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exhibition" DROP CONSTRAINT "Exhibition_districtId_fkey";

-- DropIndex
DROP INDEX "Exhibition_area_idx";

-- DropIndex
DROP INDEX "Exhibition_districtId_idx";

-- DropIndex
DROP INDEX "Exhibition_gpsX_gpsY_idx";

-- DropIndex
DROP INDEX "Exhibition_startDate_endDate_idx";

-- DropIndex
DROP INDEX "Exhibition_status_idx";

-- AlterTable
ALTER TABLE "Exhibition" DROP COLUMN "districtId",
ALTER COLUMN "gpsX" SET DATA TYPE TEXT,
ALTER COLUMN "gpsY" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "AdminDistrict";
