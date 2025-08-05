import { ConflictException, Injectable } from "@nestjs/common";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { UpdateHotelDto } from "./dto/update-hotel.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HotelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHotelDto: CreateHotelDto) {
    const isExist = await this.prisma.hotels.findFirst({
      where: {
        name: createHotelDto.name,
      },
    });
    if (isExist) {
      throw new ConflictException("Bu hotel mavjud");
    }

    const hotel = await this.prisma.hotels.create({ data: createHotelDto });
    return {message: "Hotel yaratildi", hotel};
  }

  async findAll() {
    return await this.prisma.hotels.findMany();
  }

  async findOne(id: number) {
    const hotel = await this.prisma.hotels.findUnique({ where: { id } });
    return hotel;
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const hotel = await this.prisma.hotels.update({
      where: { id },
      data: updateHotelDto,
    });
    return { message: "Hotel yangilandi", hotel };
  }

  async remove(id: number) {
    const hotel = await this.prisma.hotels.delete({ where: { id } });
    return { message: "Hotel ochirildi", hotel };
  }
}
