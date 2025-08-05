import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { BookingServiceService } from "./booking-service.service";
import { CreateBookingServiceDto } from "./dto/create-booking-service.dto";
import { UpdateBookingServiceDto } from "./dto/update-booking-service.dto";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsStaffGuard } from "src/common/guards/is-staff.guard";

@ApiTags("Booking xizmatlari")
@Controller("booking-service")
export class BookingServiceController {
  constructor(private readonly bookingServiceService: BookingServiceService) {}

  @UseGuards(AuthGuard, IsStaffGuard)
  @Post()
  @ApiOperation({ summary: "Yangi booking xizmatini yaratish" })
  @ApiBody({
    type: CreateBookingServiceDto,
    description: "Bookingga xizmat qoshish uchun malumotlar",
  })
  create(@Body() createBookingServiceDto: CreateBookingServiceDto) {
    return this.bookingServiceService.create(createBookingServiceDto);
  }

  @UseGuards(AuthGuard, IsStaffGuard)
  @Get()
  @ApiOperation({ summary: "Barcha booking xizmatlarini olish" })
  findAll() {
    return this.bookingServiceService.findAll();
  }

  @UseGuards(AuthGuard, IsStaffGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID boyicha booking xizmatini olish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Booking xizmatining ID raqami",
  })
  findOne(@Param("id") id: string) {
    return this.bookingServiceService.findOne(+id);
  }

  @UseGuards(AuthGuard, IsStaffGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Booking xizmatini yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Yangilanadigan booking xizmatining ID raqami",
  })
  @ApiBody({
    type: UpdateBookingServiceDto,
    description: "Yangilash uchun malumotlar",
  })
  update(
    @Param("id") id: string,
    @Body() updateBookingServiceDto: UpdateBookingServiceDto
  ) {
    return this.bookingServiceService.update(+id, updateBookingServiceDto);
  }

  @UseGuards(AuthGuard, IsStaffGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Booking xizmatini ochirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Ochiriladigan booking xizmatining ID raqami",
  })
  remove(@Param("id") id: string) {
    return this.bookingServiceService.remove(+id);
  }
}
