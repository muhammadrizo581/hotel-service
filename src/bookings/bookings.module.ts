import { Module } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { MailService } from "src/mail/mail.service";

@Module({
  imports: [],
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService, MailService],
})
export class BookingsModule {}
