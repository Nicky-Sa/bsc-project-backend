/*
  Warnings:

  - You are about to drop the column `dateTime` on the `TagBalanceUsage` table. All the data in the column will be lost.
  - Added the required column `month` to the `TagBalanceUsage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TagBalanceUsage" DROP COLUMN "dateTime",
ADD COLUMN     "month" TEXT NOT NULL;
