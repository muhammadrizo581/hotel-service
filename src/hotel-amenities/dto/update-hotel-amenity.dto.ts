import { PartialType } from '@nestjs/swagger';
import { CreateHotelAmenityDto } from './create-hotel-amenity.dto';

export class UpdateHotelAmenityDto extends PartialType(CreateHotelAmenityDto) {}
