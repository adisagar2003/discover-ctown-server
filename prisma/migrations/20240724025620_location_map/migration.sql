-- CreateTable
CREATE TABLE "LocationMap" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "properties" JSONB NOT NULL,
    "geometry" JSONB NOT NULL,

    CONSTRAINT "LocationMap_pkey" PRIMARY KEY ("id")
);
