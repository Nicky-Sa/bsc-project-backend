/*
  Warnings:

  - You are about to drop the column `date` on the `TagBatteryLevel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tagId,dateTime]` on the table `TagBatteryLevel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tagId,lat,lon,dateTime]` on the table `TagLocation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateTime` to the `TagBatteryLevel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TagBatteryLevel_tagId_date_key";

-- AlterTable
ALTER TABLE "TagBatteryLevel" DROP COLUMN "date",
ADD COLUMN     "dateTime" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TagBatteryLevel_tagId_dateTime_key" ON "TagBatteryLevel"("tagId", "dateTime");

-- CreateIndex
CREATE UNIQUE INDEX "TagLocation_tagId_lat_lon_dateTime_key" ON "TagLocation"("tagId", "lat", "lon", "dateTime");
