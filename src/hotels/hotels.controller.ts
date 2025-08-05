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
import { HotelsService } from "./hotels.service";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { UpdateHotelDto } from "./dto/update-hotel.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsReceptionistGuard } from "src/common/guards/is-receptionist.guard";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";

@ApiTags("Mehmonxonalar")
@Controller("hotels")
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi mehmonxona qoshish" })
  @ApiResponse({
    status: 201,
    description: "Mehmonxona muvaffaqiyatli yaratildi",
  })
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha mehmonxonalarni olish" })
  @ApiResponse({ status: 200, description: "Mehmonxonalar royxati" })
  findAll() {
    return this.hotelsService.findAll();
  }


  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID orqali mehmonxona topish" })
  @ApiParam({ name: "id", type: "string", description: "Mehmonxona ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan mehmonxona" })
  findOne(@Param("id") id: string) {
    return this.hotelsService.findOne(+id);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Mehmonxonani tahrirlash" })
  @ApiParam({ name: "id", type: "string", description: "Mehmonxona ID raqami" })
  @ApiResponse({ status: 200, description: "Tahrirlangan mehmonxona" })
  update(@Param("id") id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Mehmonxonani ochirish" })
  @ApiParam({ name: "id", type: "string", description: "Mehmonxona ID raqami" })
  @ApiResponse({ status: 200, description: "ochirilgan mehmonxona" })
  remove(@Param("id") id: string) {
    return this.hotelsService.remove(+id);
  }
}
