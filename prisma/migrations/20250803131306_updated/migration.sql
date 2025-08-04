/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `room_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "room_types_name_key" ON "public"."room_types"("name");
