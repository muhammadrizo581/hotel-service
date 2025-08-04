import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HotelAmenitiesService } from "./hotel-amenities.service";
import { CreateHotelAmenityDto } from "./dto/create-hotel-amenity.dto";
import { UpdateHotelAmenityDto } from "./dto/update-hotel-amenity.dto";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags("Mehmonxona qulayliklari") // Swagger bolim nomi
@Controller("hotel-amenities")
export class HotelAmenitiesController {
  constructor(private readonly hotelAmenitiesService: HotelAmenitiesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi mehmonxona qulayligi qoshish" })
  @ApiBody({ type: CreateHotelAmenityDto })
  create(@Body() createHotelAmenityDto: CreateHotelAmenityDto) {
    return this.hotelAmenitiesService.create(createHotelAmenityDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha mehmonxona qulayliklarini korish" })
  findAll() {
    return this.hotelAmenitiesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Qulaylikni ID orqali topish" })
  @ApiParam({ name: "id", description: "Qulaylik IDsi" })
  findOne(@Param("id") id: string) {
    return this.hotelAmenitiesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Qulaylik ma’lumotini yangilash" })
  @ApiParam({ name: "id", description: "Qulaylik IDsi" })
  @ApiBody({ type: UpdateHotelAmenityDto })
  update(
    @Param("id") id: string,
    @Body() updateHotelAmenityDto: UpdateHotelAmenityDto
  ) {
    return this.hotelAmenitiesService.update(+id, updateHotelAmenityDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Qulaylikni ochirish" })
  @ApiParam({ name: "id", description: "Qulaylik IDsi" })
  remove(@Param("id") id: string) {
    return this.hotelAmenitiesService.remove(+id);
  }
}
