/*
  Warnings:

  - You are about to drop the `_LocationMapToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LocationMapToUser" DROP CONSTRAINT "_LocationMapToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LocationMapToUser" DROP CONSTRAINT "_LocationMapToUser_B_fkey";

-- AlterTable
ALTER TABLE "LocationMap" ADD COLUMN     "User" BIGINT[] DEFAULT ARRAY[]::BIGINT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locations" BIGINT[] DEFAULT ARRAY[]::BIGINT[];

-- DropTable
DROP TABLE "_LocationMapToUser";
