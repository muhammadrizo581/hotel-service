import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoomTypesService } from "./room-types.service";
import { CreateRoomTypeDto } from "./dto/create-room-type.dto";
import { UpdateRoomTypeDto } from "./dto/update-room-type.dto";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";

@ApiTags("Xona turlari")
@Controller("room-types")
export class RoomTypesController {
  constructor(private readonly roomTypesService: RoomTypesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xona turini qo‘shish" })
  create(@Body() createRoomTypeDto: CreateRoomTypeDto) {
    return this.roomTypesService.create(createRoomTypeDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xona turlarini ko‘rish" })
  findAll() {
    return this.roomTypesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Xona turini ID bo‘yicha topish" })
  @ApiParam({ name: "id", description: "Xona turi ID raqami" })
  findOne(@Param("id") id: string) {
    return this.roomTypesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xona turini yangilash" })
  @ApiParam({ name: "id", description: "Yangilanadigan xona turi ID raqami" })
  update(
    @Param("id") id: string,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto
  ) {
    return this.roomTypesService.update(+id, updateRoomTypeDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xona turini o‘chirish" })
  @ApiParam({ name: "id", description: "O‘chiriladigan xona turi ID raqami" })
  remove(@Param("id") id: string) {
    return this.roomTypesService.remove(+id);
  }
}
