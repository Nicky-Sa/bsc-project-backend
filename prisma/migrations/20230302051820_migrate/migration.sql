/*
  Warnings:

  - A unique constraint covering the columns `[tagId,text,date]` on the table `TagMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TagMessage_tagId_text_date_key" ON "TagMessage"("tagId", "text", "date");
