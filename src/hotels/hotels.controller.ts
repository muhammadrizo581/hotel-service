import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HotelsService } from "./hotels.service";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { UpdateHotelDto } from "./dto/update-hotel.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Mehmonxonalar")
@Controller("hotels")
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi mehmonxona qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Mehmonxona muvaffaqiyatli yaratildi",
  })
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha mehmonxonalarni olish" })
  @ApiResponse({ status: 200, description: "Mehmonxonalar ro‘yxati" })
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali mehmonxona topish" })
  @ApiParam({ name: "id", type: "string", description: "Mehmonxona ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan mehmonxona" })
  findOne(@Param("id") id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mehmonxonani tahrirlash" })
  @ApiParam({ name: "id", type: "string", description: "Mehmonxona ID raqami" })
  @ApiResponse({ status: 200, description: "Tahrirlangan mehmonxona" })
  update(@Param("id") id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Mehmonxonani o‘chirish" })
  @ApiParam({ name: "id", type: "string", description: "Mehmonxona ID raqami" })
  @ApiResponse({ status: 200, description: "O‘chirilgan mehmonxona" })
  remove(@Param("id") id: string) {
    return this.hotelsService.remove(+id);
  }
}
