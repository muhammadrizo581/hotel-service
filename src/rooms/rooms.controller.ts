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
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";
import { AuthGuard } from "src/common/guards/auth.guard";
import { SelfGuard } from "src/common/guards/self.guard";
import { FilterRoomsDto } from "./dto/create-room.dto copy";

@ApiTags("Xonalar")
@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(AuthGuard, IsAdminGuard)
  @Post()
  @ApiOperation({ summary: "Yangi xona qoshish" })
  @ApiResponse({ status: 201, description: "Xona muvaffaqiyatli qoshildi" })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get()
  @ApiOperation({ summary: "Barcha xonalarni olish" })
  @ApiResponse({ status: 200, description: "Xonalar royxati" })
  findAll() {
    return this.roomsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("free")
  @ApiOperation({ summary: "Barcha mavjud xonalarni olish" })
  @ApiResponse({ status: 200, description: "Xonalar royxati" })
  free_rooms() {
    return this.roomsService.free_rooms();
  }

  @UseGuards(AuthGuard)
  @Get("filter")
  @ApiOperation({ summary: "Xonalarni filtrlash" })
  @ApiResponse({ status: 200, description: "Xonalarni filtrlash" })
  filter_rooms(@Body() filterRoomsDto: FilterRoomsDto) {
    return this.roomsService.filter_rooms(filterRoomsDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get(":id")
  @ApiOperation({ summary: "Xona ID boyicha ma’lumot olish" })
  @ApiResponse({ status: 200, description: "Topilgan xona" })
  @ApiResponse({ status: 404, description: "Xona topilmadi" })
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(+id);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Xona ma’lumotini yangilash" })
  @ApiResponse({ status: 200, description: "Xona yangilandi" })
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Xonani ochirish" })
  @ApiResponse({ status: 200, description: "Xona ochirildi" })
  remove(@Param("id") id: string) {
    return this.roomsService.remove(+id);
  }
}
