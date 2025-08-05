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
import { RoomAmenitiesService } from "./room-amenities.service";
import { CreateRoomAmenityDto } from "./dto/create-room-amenity.dto";
import { UpdateRoomAmenityDto } from "./dto/update-room-amenity.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";

@ApiTags("Xona qulayliklari")
@Controller("room-amenities")
export class RoomAmenitiesController {
  constructor(private readonly roomAmenitiesService: RoomAmenitiesService) {}

  @UseGuards(AuthGuard, IsAdminGuard)
  @Post()
  @ApiOperation({ summary: "Yangi xona qulayligini qoshish" })
  create(@Body() createRoomAmenityDto: CreateRoomAmenityDto) {
    return this.roomAmenitiesService.create(createRoomAmenityDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha xona qulayliklarini korish" })
  findAll() {
    return this.roomAmenitiesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID boyicha bitta xona qulayligini korish" })
  findOne(@Param("id") id: string) {
    return this.roomAmenitiesService.findOne(+id);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Xona qulayligini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateRoomAmenityDto: UpdateRoomAmenityDto
  ) {
    return this.roomAmenitiesService.update(+id, updateRoomAmenityDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Xona qulayligini ochirish" })
  remove(@Param("id") id: string) {
    return this.roomAmenitiesService.remove(+id);
  }
}
