import { Injectable } from "@nestjs/common";
import { CreateBookingServiceDto } from "./dto/create-booking-service.dto";
import { UpdateBookingServiceDto } from "./dto/update-booking-service.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BookingServiceService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBookingServiceDto: CreateBookingServiceDto) {
    const bookingService = await this.prisma.booking_service.create({
      data: createBookingServiceDto,
    });
    return bookingService;
  }

  async findAll() {
    return await this.prisma.booking_service.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.booking_service.findUnique({ where: { id } });
  }

  async update(id: number, updateBookingServiceDto: UpdateBookingServiceDto) {
    const bookingService = await this.prisma.booking_service.update({
      where: { id },
      data: updateBookingServiceDto,
    });
    return bookingService;
  }

  async remove(id: number) {
    const bookingService = await this.prisma.booking_service.delete({
      where: { id },
    });
    return bookingService;
  }
}
