/*
  Warnings:

  - You are about to drop the column `date` on the `TagMessage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tagId,text,dateTime]` on the table `TagMessage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateTime` to the `TagMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TagMessage_tagId_text_date_key";

-- AlterTable
ALTER TABLE "TagMessage" DROP COLUMN "date",
ADD COLUMN     "dateTime" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TagMessage_tagId_text_dateTime_key" ON "TagMessage"("tagId", "text", "dateTime");
