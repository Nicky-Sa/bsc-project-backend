/*
  Warnings:

  - A unique constraint covering the columns `[tagId,amount]` on the table `TagBalanceUsage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TagBalanceUsage_tagId_amount_key" ON "TagBalanceUsage"("tagId", "amount");
