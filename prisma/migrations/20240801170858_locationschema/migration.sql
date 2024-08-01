/*
  Warnings:

  - You are about to drop the column `User` on the `LocationMap` table. All the data in the column will be lost.
  - You are about to alter the column `locations` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "LocationMap" DROP COLUMN "User";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "locations" SET DATA TYPE INTEGER[];
