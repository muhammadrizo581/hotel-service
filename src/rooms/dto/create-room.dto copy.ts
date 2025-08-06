import { IsOptional, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class FilterRoomsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  hotel_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  room_type_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_price?: number;
}
