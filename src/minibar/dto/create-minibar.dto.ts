import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMinibarDto {
  @ApiProperty({ example: "Sharbat", description: "Mahsulot nomi" })
  @IsString({ message: "Mahsulot nomi satr ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Mahsulot nomi bo‘sh bo‘lmasligi kerak" })
  item_name: string;

  @ApiProperty({ example: 1, description: "Qaysi xonaga tegishli" })
  @IsNumber({}, { message: "Xona ID raqam bo‘lishi kerak" })
  room_id: number;

  @ApiProperty({ example: 5, description: "Mahsulot soni" })
  @IsNumber({}, { message: "Soni raqam bo‘lishi kerak" })
  @Min(1, { message: "Soni kamida 1 bo‘lishi kerak" })
  quantity: number;

  @ApiProperty({ example: 15000, description: "Bir dona mahsulot narxi" })
  @IsNumber({}, { message: "Narx raqam bo‘lishi kerak" })
  @Min(0, { message: "Narx manfiy bo‘lmasligi kerak" })
  price_per_item: number;
}
