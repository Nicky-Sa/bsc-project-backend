/*
  Warnings:

  - You are about to drop the column `level` on the `TagBatteryLevel` table. All the data in the column will be lost.
  - Added the required column `value` to the `TagBatteryLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TagBatteryLevel" DROP COLUMN "level",
ADD COLUMN     "value" INTEGER NOT NULL;
