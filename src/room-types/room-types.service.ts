import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateRoomTypeDto } from "./dto/create-room-type.dto";
import { UpdateRoomTypeDto } from "./dto/update-room-type.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoomTypesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomTypeDto: CreateRoomTypeDto) {
    const isExist = await this.prisma.room_types.findUnique({
      where: {
        name: createRoomTypeDto.name,
      },
    });
    if (isExist) {
      throw new Error("Bunday nomli room type allaqachon mavjud");
    }
    return this.prisma.room_types.create({
      data: createRoomTypeDto,
    });
  }

  async findAll() {
    const roomTypes = await this.prisma.room_types.findMany();
    return roomTypes;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const roomType = await this.prisma.room_types.findUnique({
      where: {
        id,
      },
    });
    return roomType;
  }

  async update(id: number, updateRoomTypeDto: UpdateRoomTypeDto) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const roomType = await this.prisma.room_types.update({
      where: {
        id,
      },
      data: updateRoomTypeDto,
    });
    return `yangilandi\n${roomType}`;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const roomType = await this.prisma.room_types.delete({
      where: {
        id,
      },
    });
    return `${id} id dagi room type ochirildi`;
  }
}
