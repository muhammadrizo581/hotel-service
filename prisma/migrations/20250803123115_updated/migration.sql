/*
  Warnings:

  - You are about to drop the column `is_active` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `staffs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."customers" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "public"."staffs" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;
