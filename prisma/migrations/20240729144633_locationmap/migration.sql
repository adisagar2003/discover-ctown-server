/*
  Warnings:

  - You are about to drop the column `Location` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Location";

-- CreateTable
CREATE TABLE "_LocationMapToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LocationMapToUser_AB_unique" ON "_LocationMapToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationMapToUser_B_index" ON "_LocationMapToUser"("B");

-- AddForeignKey
ALTER TABLE "_LocationMapToUser" ADD CONSTRAINT "_LocationMapToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "LocationMap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationMapToUser" ADD CONSTRAINT "_LocationMapToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
