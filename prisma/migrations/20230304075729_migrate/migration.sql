/*
  Warnings:

  - You are about to drop the column `amount` on the `TagBalanceUsage` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `value` to the `TagBalanceUsage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TagBalanceUsage" DROP COLUMN "amount",
ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
ADD COLUMN     "value" INTEGER NOT NULL;
