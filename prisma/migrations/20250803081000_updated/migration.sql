/*
  Warnings:

  - You are about to drop the column `bookingsId` on the `booking_services` table. All the data in the column will be lost.
  - You are about to drop the column `servicesId` on the `booking_services` table. All the data in the column will be lost.
  - You are about to drop the column `customersId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `roomsId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `room_typesId` on the `discounts` table. All the data in the column will be lost.
  - You are about to drop the column `hotelsId` on the `hotel_amenities` table. All the data in the column will be lost.
  - You are about to drop the column `customersId` on the `loyalty_clients` table. All the data in the column will be lost.
  - You are about to drop the column `roomsId` on the `minibar` table. All the data in the column will be lost.
  - You are about to drop the column `bookingsId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `customersId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `room_typesId` on the `room_amenties` table. All the data in the column will be lost.
  - You are about to drop the column `hotelsId` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `room_typesId` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `hotelsId` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `staff_rolesId` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `rolesId` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_roles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."booking_services" DROP CONSTRAINT "booking_services_bookingsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."booking_services" DROP CONSTRAINT "booking_services_servicesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."bookings" DROP CONSTRAINT "bookings_customersId_fkey";

-- DropForeignKey
ALTER TABLE "public"."bookings" DROP CONSTRAINT "bookings_roomsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."customers" DROP CONSTRAINT "customers_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."discounts" DROP CONSTRAINT "discounts_room_typesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."hotel_amenities" DROP CONSTRAINT "hotel_amenities_hotelsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."loyalty_clients" DROP CONSTRAINT "loyalty_clients_customersId_fkey";

-- DropForeignKey
ALTER TABLE "public"."minibar" DROP CONSTRAINT "minibar_roomsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_bookingsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_customersId_fkey";

-- DropForeignKey
ALTER TABLE "public"."room_amenties" DROP CONSTRAINT "room_amenties_room_typesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."rooms" DROP CONSTRAINT "rooms_hotelsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."rooms" DROP CONSTRAINT "rooms_room_typesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."staffs" DROP CONSTRAINT "staffs_hotelsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."staffs" DROP CONSTRAINT "staffs_staff_rolesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."staffs" DROP CONSTRAINT "staffs_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_roles" DROP CONSTRAINT "user_roles_rolesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_roles" DROP CONSTRAINT "user_roles_userId_fkey";

-- AlterTable
ALTER TABLE "public"."booking_services" DROP COLUMN "bookingsId",
DROP COLUMN "servicesId";

-- AlterTable
ALTER TABLE "public"."bookings" DROP COLUMN "customersId",
DROP COLUMN "roomsId";

-- AlterTable
ALTER TABLE "public"."customers" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."discounts" DROP COLUMN "room_typesId";

-- AlterTable
ALTER TABLE "public"."hotel_amenities" DROP COLUMN "hotelsId";

-- AlterTable
ALTER TABLE "public"."loyalty_clients" DROP COLUMN "customersId";

-- AlterTable
ALTER TABLE "public"."minibar" DROP COLUMN "roomsId";

-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "bookingsId";

-- AlterTable
ALTER TABLE "public"."reviews" DROP COLUMN "customersId";

-- AlterTable
ALTER TABLE "public"."room_amenties" DROP COLUMN "room_typesId";

-- AlterTable
ALTER TABLE "public"."rooms" DROP COLUMN "hotelsId",
DROP COLUMN "room_typesId";

-- AlterTable
ALTER TABLE "public"."staffs" DROP COLUMN "hotelsId",
DROP COLUMN "staff_rolesId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."user_roles" DROP COLUMN "rolesId",
DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."staffs" ADD CONSTRAINT "staffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."staffs" ADD CONSTRAINT "staffs_staff_role_id_fkey" FOREIGN KEY ("staff_role_id") REFERENCES "public"."staff_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."staffs" ADD CONSTRAINT "staffs_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hotel_amenities" ADD CONSTRAINT "hotel_amenities_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rooms" ADD CONSTRAINT "rooms_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rooms" ADD CONSTRAINT "rooms_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "public"."room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."room_amenties" ADD CONSTRAINT "room_amenties_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."discounts" ADD CONSTRAINT "discounts_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "public"."room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."minibar" ADD CONSTRAINT "minibar_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."booking_services" ADD CONSTRAINT "booking_services_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."booking_services" ADD CONSTRAINT "booking_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."loyalty_clients" ADD CONSTRAINT "loyalty_clients_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
