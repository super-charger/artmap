/*
  Warnings:

  - You are about to alter the column `gpsX` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,7)` to `DoublePrecision`.
  - You are about to alter the column `gpsY` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,7)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Exhibition" ALTER COLUMN "gpsX" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "gpsY" SET DATA TYPE DOUBLE PRECISION;
