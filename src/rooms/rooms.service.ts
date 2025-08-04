import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const isExist = await this.prisma.rooms.findUnique({
      where: {
        room_number: createRoomDto.room_number,
      },
    });
    if (isExist) {
      throw new Error(
        `${createRoomDto.room_number} raqamli xona allaqachon mavjud`
      );
    }
    const room = await this.prisma.rooms.create({ data: createRoomDto });
    return room;
  }

  async findAll() {
    const rooms = await this.prisma.rooms.findMany();
    return rooms;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const room = await this.prisma.rooms.findUnique({ where: { id } });
    if (!room) {
      throw new Error("Bu ID dagi xona topilmadi");
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const room = await this.prisma.rooms.findUnique({ where: { id } });
    if (!room) {
      throw new Error("Bu ID dagi xona topilmadi");
    }
    const updatedRoom = await this.prisma.rooms.update({
      where: { id },
      data: updateRoomDto,
    });
    return `${id} raqamli xona yangilandi\n${updatedRoom}`;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const room = await this.prisma.rooms.findUnique({ where: { id } });
    if (!room) {
      throw new Error("Bu ID dagi xona topilmadi");
    }
    const deletedRoom = await this.prisma.rooms.delete({ where: { id } });
    return `${id} raqamli xona ochirildi`;
  }
}
