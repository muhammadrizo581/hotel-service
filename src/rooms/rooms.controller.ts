import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Xonalar")
@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xona qo‘shish" })
  @ApiResponse({ status: 201, description: "Xona muvaffaqiyatli qo‘shildi" })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xonalarni olish" })
  @ApiResponse({ status: 200, description: "Xonalar ro‘yxati" })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Xona ID bo‘yicha ma’lumot olish" })
  @ApiResponse({ status: 200, description: "Topilgan xona" })
  @ApiResponse({ status: 404, description: "Xona topilmadi" })
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xona ma’lumotini yangilash" })
  @ApiResponse({ status: 200, description: "Xona yangilandi" })
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xonani o‘chirish" })
  @ApiResponse({ status: 200, description: "Xona o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.roomsService.remove(+id);
  }
}
