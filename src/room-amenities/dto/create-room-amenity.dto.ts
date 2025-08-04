import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomAmenityDto {
  @ApiProperty({ example: "Konditsioner", description: "Xona qulayligi nomi" })
  @IsNotEmpty({ message: "Qulaylik nomi bo‘sh bo‘lmasligi kerak" })
  @IsString({ message: "Qulaylik nomi matn bo‘lishi kerak" })
  name: string;

  @ApiProperty({ example: 1, description: "Xona turi ID raqami" })
  @IsNotEmpty({ message: "Xona turi ID bo‘sh bo‘lmasligi kerak" })
  @IsNumber({}, { message: "Xona turi ID raqami butun son bo‘lishi kerak" })
  room_type_id: number;
}
