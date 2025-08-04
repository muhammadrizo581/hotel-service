import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags("Bookinglar")
@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi booking yaratish" })
  @ApiBody({ type: CreateBookingDto, description: "Yangi booking malumotlari" })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bookinglarni olish" })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID boyicha bookingni olish" })
  @ApiParam({ name: "id", type: Number, description: "Booking ID raqami" })
  findOne(@Param("id") id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Bookingni yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Yangilanadigan booking ID raqami",
  })
  @ApiBody({ type: UpdateBookingDto, description: "Yangilangan malumotlar" })
  update(@Param("id") id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Bookingni ochirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Ochiriladigan booking ID raqami",
  })
  remove(@Param("id") id: string) {
    return this.bookingsService.remove(+id);
  }
}
