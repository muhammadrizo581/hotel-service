import { Module } from "@nestjs/common";
import { RoomAmenitiesService } from "./room-amenities.service";
import { RoomAmenitiesController } from "./room-amenities.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [RoomAmenitiesController],
  providers: [RoomAmenitiesService],
})
export class RoomAmenitiesModule {}
