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
import { RoomTypesService } from "./room-types.service";
import { CreateRoomTypeDto } from "./dto/create-room-type.dto";
import { UpdateRoomTypeDto } from "./dto/update-room-type.dto";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("Xona turlari")
@Controller("room-types")
export class RoomTypesController {
  constructor(private readonly roomTypesService: RoomTypesService) {}

  @UseGuards(AuthGuard, IsAdminGuard)
  @Post()
  @ApiOperation({ summary: "Yangi xona turini qoshish" })
  create(@Body() createRoomTypeDto: CreateRoomTypeDto) {
    return this.roomTypesService.create(createRoomTypeDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha xona turlarini korish" })
  findAll() {
    return this.roomTypesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Xona turini ID boyicha topish" })
  @ApiParam({ name: "id", description: "Xona turi ID raqami" })
  findOne(@Param("id") id: string) {
    return this.roomTypesService.findOne(+id);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Xona turini yangilash" })
  @ApiParam({ name: "id", description: "Yangilanadigan xona turi ID raqami" })
  update(
    @Param("id") id: string,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto
  ) {
    return this.roomTypesService.update(+id, updateRoomTypeDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Xona turini ochirish" })
  @ApiParam({ name: "id", description: "ochiriladigan xona turi ID raqami" })
  remove(@Param("id") id: string) {
    return this.roomTypesService.remove(+id);
  }
}
