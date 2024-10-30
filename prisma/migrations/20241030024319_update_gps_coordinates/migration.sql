/*
  Warnings:

  - Changed the type of `gpsX` on the `Exhibition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gpsY` on the `Exhibition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Exhibition"
  ALTER COLUMN "gpsX" TYPE DECIMAL(10,7)
  USING CAST(NULLIF(TRIM("gpsX"), '') AS DECIMAL(10,7)),
  ALTER COLUMN "gpsY" TYPE DECIMAL(10,7)
  USING CAST(NULLIF(TRIM("gpsY"), '') AS DECIMAL(10,7));
