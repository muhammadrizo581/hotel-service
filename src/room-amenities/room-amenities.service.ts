import { Injectable } from "@nestjs/common";
import { CreateRoomAmenityDto } from "./dto/create-room-amenity.dto";
import { UpdateRoomAmenityDto } from "./dto/update-room-amenity.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoomAmenitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomAmenityDto: CreateRoomAmenityDto) {
    const isExist = await this.prisma.room_amenties.findUnique({
      where: { name: createRoomAmenityDto.name },
    });
    if (isExist) {
      throw new Error("Room amenity already exists");
    }
    const roomAmenity = await this.prisma.room_amenties.create({
      data: createRoomAmenityDto,
    });
    return roomAmenity;
  }

  async findAll() {
    const roomAmenities = await this.prisma.room_amenties.findMany();
    return roomAmenities;
  }

  async findOne(id: number) {
    const roomAmenity = await this.prisma.room_amenties.findUnique({
      where: { id },
    });
    return roomAmenity;
  }

  async update(id: number, updateRoomAmenityDto: UpdateRoomAmenityDto) {
    const updatedRoomAmenity = await this.prisma.room_amenties.update({
      where: { id },
      data: updateRoomAmenityDto,
    });
    return updatedRoomAmenity;
  }

  async remove(id: number) {
    const deletedRoomAmenity = await this.prisma.room_amenties.delete({
      where: { id },
    });
    return deletedRoomAmenity;
  }
}
