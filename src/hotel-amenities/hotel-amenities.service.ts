import { Injectable } from "@nestjs/common";
import { CreateHotelAmenityDto } from "./dto/create-hotel-amenity.dto";
import { UpdateHotelAmenityDto } from "./dto/update-hotel-amenity.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HotelAmenitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHotelAmenityDto: CreateHotelAmenityDto) {
    const isExist = await this.prisma.hotel_amenities.findUnique({
      where: { name: createHotelAmenityDto.name },
    });
    if (isExist) {
      throw new Error("Hotel amenity already exists");
    }
    const hotelAmenity = await this.prisma.hotel_amenities.create({
      data: createHotelAmenityDto,
    });
    return hotelAmenity;
  }

  async findAll() {
    const hotelAmenities = await this.prisma.hotel_amenities.findMany();
    return hotelAmenities;
  }

  async findOne(id: number) {
    const hotelAmenity = await this.prisma.hotel_amenities.findUnique({
      where: { id },
    });
    return hotelAmenity;
  }

  async update(id: number, updateHotelAmenityDto: UpdateHotelAmenityDto) {
    const hotelAmenity = await this.prisma.hotel_amenities.update({
      where: { id },
      data: updateHotelAmenityDto,
    });
    return hotelAmenity;
  }

  async remove(id: number) {
    const hotelAmenity = await this.prisma.hotel_amenities.delete({
      where: { id },
    });
    return hotelAmenity;
  }
}
