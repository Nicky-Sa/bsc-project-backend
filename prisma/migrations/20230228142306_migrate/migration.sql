/*
  Warnings:

  - You are about to drop the column `date` on the `TagLocation` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `TagLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TagBalanceUsage" ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TagBatteryLevel" ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TagLocation" DROP COLUMN "date",
ADD COLUMN     "dateTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TagMessage" ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;
