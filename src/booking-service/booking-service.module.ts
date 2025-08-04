import { Module } from "@nestjs/common";
import { BookingServiceService } from "./booking-service.service";
import { BookingServiceController } from "./booking-service.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BookingServiceController],
  providers: [BookingServiceService],
})
export class BookingServiceModule {}
