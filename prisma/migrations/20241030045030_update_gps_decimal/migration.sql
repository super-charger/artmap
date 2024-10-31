/*
  Warnings:

  - You are about to alter the column `gpsX` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,7)`.
  - You are about to alter the column `gpsY` on the `Exhibition` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,7)`.

*/
-- AlterTable
ALTER TABLE "Exhibition" ALTER COLUMN "gpsX" SET DATA TYPE DECIMAL(10,7),
ALTER COLUMN "gpsY" SET DATA TYPE DECIMAL(10,7);
