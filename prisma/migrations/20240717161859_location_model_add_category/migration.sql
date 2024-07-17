-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'dining',
ALTER COLUMN "likes" SET DEFAULT 0;
