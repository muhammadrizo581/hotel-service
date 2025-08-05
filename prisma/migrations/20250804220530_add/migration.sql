/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `staff_roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "staff_roles_name_key" ON "public"."staff_roles"("name");
