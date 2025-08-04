import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHotelAmenityDto {
  @ApiProperty({
    example: "Wi-Fi",
    description: "Qulaylik nomi",
  })
  @IsNotEmpty({ message: "Nomi bosh bolmasligi kerak" })
  @IsString({ message: "Nomi matn korinishida bolishi kerak" })
  name: string;

  @ApiProperty({
    example: 1,
    description: "Qaysi mehmonxonaga tegishli ekanligi (ID)",
  })
  @IsNotEmpty({ message: "Mehmonxona IDsi korsatilishi shart" })
  @IsNumber({}, { message: "Mehmonxona IDsi raqam bolishi kerak" })
  hotel_id: number;
}
