/*
  Warnings:

  - You are about to drop the column `date` on the `TagBalanceUsage` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `TagBalanceUsage` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dateTime` on the `TagBatteryLevel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dateTime` on the `TagLocation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dateTime` on the `TagMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TagBalanceUsage" DROP COLUMN "date",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TagBatteryLevel" DROP COLUMN "dateTime",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TagLocation" DROP COLUMN "dateTime",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TagMessage" DROP COLUMN "dateTime",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "date",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "TagBatteryLevel_tagId_dateTime_key" ON "TagBatteryLevel"("tagId", "dateTime");

-- CreateIndex
CREATE UNIQUE INDEX "TagLocation_tagId_lat_lon_dateTime_key" ON "TagLocation"("tagId", "lat", "lon", "dateTime");

-- CreateIndex
CREATE UNIQUE INDEX "TagMessage_tagId_text_dateTime_key" ON "TagMessage"("tagId", "text", "dateTime");
