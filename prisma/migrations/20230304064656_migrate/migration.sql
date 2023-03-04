/*
  Warnings:

  - A unique constraint covering the columns `[tagId,month]` on the table `TagBalanceUsage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TagBalanceUsage_tagId_amount_key";

-- CreateIndex
CREATE UNIQUE INDEX "TagBalanceUsage_tagId_month_key" ON "TagBalanceUsage"("tagId", "month");
