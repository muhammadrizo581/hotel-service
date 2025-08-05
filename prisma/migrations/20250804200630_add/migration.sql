-- AlterTable
ALTER TABLE "public"."admins" ADD COLUMN     "hashed_refresh_token_admin" TEXT NOT NULL DEFAULT '';
