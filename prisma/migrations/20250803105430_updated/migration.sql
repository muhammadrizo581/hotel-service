/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `hotel_amenities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "hotel_amenities_name_key" ON "public"."hotel_amenities"("name");
