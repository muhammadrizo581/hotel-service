import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoomAmenitiesService } from "./room-amenities.service";
import { CreateRoomAmenityDto } from "./dto/create-room-amenity.dto";
import { UpdateRoomAmenityDto } from "./dto/update-room-amenity.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Xona qulayliklari")
@Controller("room-amenities")
export class RoomAmenitiesController {
  constructor(private readonly roomAmenitiesService: RoomAmenitiesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xona qulayligini qo‘shish" })
  create(@Body() createRoomAmenityDto: CreateRoomAmenityDto) {
    return this.roomAmenitiesService.create(createRoomAmenityDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xona qulayliklarini ko‘rish" })
  findAll() {
    return this.roomAmenitiesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta xona qulayligini ko‘rish" })
  findOne(@Param("id") id: string) {
    return this.roomAmenitiesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xona qulayligini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateRoomAmenityDto: UpdateRoomAmenityDto
  ) {
    return this.roomAmenitiesService.update(+id, updateRoomAmenityDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xona qulayligini o‘chirish" })
  remove(@Param("id") id: string) {
    return this.roomAmenitiesService.remove(+id);
  }
}
