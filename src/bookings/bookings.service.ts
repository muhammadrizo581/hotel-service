import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    const booking = this.prisma.bookings.create({
      data: createBookingDto,
    });
    return booking;
  }

  async findAll() {
    const bookings = this.prisma.bookings.findMany();
    return bookings;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const booking = this.prisma.bookings.findUnique({
      where: {
        id,
      },
    });
    return `Booking ${id} topildi\n${booking}`;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const updaterdBooking = await this.prisma.bookings.update({
      where: { id },
      data: updateBookingDto,
    });
    return `Booking ${id} ozgartirildi\n${updaterdBooking}`;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const booking = await this.prisma.bookings.delete({
      where: {
        id,
      },
    });
    return `Booking ${id} ochirildi\n${booking}`;
  }
}
