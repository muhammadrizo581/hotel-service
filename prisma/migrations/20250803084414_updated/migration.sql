/*
  Warnings:

  - You are about to drop the column `room_id` on the `room_amenties` table. All the data in the column will be lost.
  - Added the required column `room_type_id` to the `room_amenties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."room_amenties" DROP CONSTRAINT "room_amenties_room_id_fkey";

-- AlterTable
ALTER TABLE "public"."room_amenties" DROP COLUMN "room_id",
ADD COLUMN     "room_type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."room_amenties" ADD CONSTRAINT "room_amenties_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "public"."room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
