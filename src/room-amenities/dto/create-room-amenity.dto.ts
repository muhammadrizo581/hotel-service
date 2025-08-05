import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomAmenityDto {
  @ApiProperty({ example: "Konditsioner", description: "Xona qulayligi nomi" })
  @IsNotEmpty({ message: "Qulaylik nomi bosh bolmasligi kerak" })
  @IsString({ message: "Qulaylik nomi matn bolishi kerak" })
  name: string;

  @ApiProperty({ example: 1, description: "Xona turi ID raqami" })
  @IsNotEmpty({ message: "Xona turi ID bosh bolmasligi kerak" })
  @IsNumber({}, { message: "Xona turi ID raqami butun son bolishi kerak" })
  room_type_id: number;
}
