/*
  Warnings:

  - A unique constraint covering the columns `[tagId,date]` on the table `TagBatteryLevel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TagBatteryLevel_tagId_date_key" ON "TagBatteryLevel"("tagId", "date");
