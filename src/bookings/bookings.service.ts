import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const room = await this.prisma.rooms.findUnique({
      where: { id: createBookingDto.room_id },
    });

    const customer = await this.prisma.customers.findUnique({
      where: { id: createBookingDto.customer_id },
    });

    if (!customer) {
      throw new BadRequestException("Mijoz topilmadi");
    }

    if (!room) {
      throw new BadRequestException("Xona topilmadi");
    }

    if (!room.is_available) {
      throw new BadRequestException("Xona allaqachon band qilingan");
    }

    const booking = await this.prisma.bookings.create({
      data: {
        ...createBookingDto,
        status: "pending",
      },

      include: {
        Customers: {
          include: {
            User: true,
          },
        },
      },
    });

    await this.prisma.rooms.update({
      where: { id: createBookingDto.room_id },
      data: { is_available: false },
    });

    const user = booking.Customers?.User;
    if (user && user.email) {
      await this.mailService.sendBookingConfirmation(
        user.email,
        `${user.name} ${user.surname}`,
        createBookingDto.checkin_date.toString(),
        createBookingDto.checkout_date.toString(),
        room.room_number.toString()
      );
    }

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
