import { Module } from "@nestjs/common";
import { HotelAmenitiesService } from "./hotel-amenities.service";
import { HotelAmenitiesController } from "./hotel-amenities.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [HotelAmenitiesController],
  providers: [HotelAmenitiesService],
})
export class HotelAmenitiesModule {}
