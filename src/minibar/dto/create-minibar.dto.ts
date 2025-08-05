import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMinibarDto {
  @ApiProperty({ example: "Sharbat", description: "Mahsulot nomi" })
  @IsString({ message: "Mahsulot nomi satr korinishida bolishi kerak" })
  @IsNotEmpty({ message: "Mahsulot nomi bosh bolmasligi kerak" })
  item_name: string;

  @ApiProperty({ example: 1, description: "Qaysi xonaga tegishli" })
  @IsNumber({}, { message: "Xona ID raqam bolishi kerak" })
  room_id: number;

  @ApiProperty({ example: 5, description: "Mahsulot soni" })
  @IsNumber({}, { message: "Soni raqam bolishi kerak" })
  @Min(1, { message: "Soni kamida 1 bolishi kerak" })
  quantity: number;

  @ApiProperty({ example: 15000, description: "Bir dona mahsulot narxi" })
  @IsNumber({}, { message: "Narx raqam bolishi kerak" })
  @Min(0, { message: "Narx manfiy bolmasligi kerak" })
  price_per_item: number;
}
