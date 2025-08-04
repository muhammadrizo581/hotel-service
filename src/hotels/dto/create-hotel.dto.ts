import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHotelDto {
  @ApiProperty({ example: "O‘zbekiston Mehmonxonasi" })
  @IsString({ message: "Nomi matn ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Nomi bo‘sh bo‘lmasligi kerak" })
  name: string;

  @ApiProperty({ example: "Toshkent shahar, Amir Temur ko‘chasi, 12-uy" })
  @IsString({ message: "Manzil matn ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Manzil bo‘sh bo‘lmasligi kerak" })
  address: string;

  @ApiProperty({ example: "Toshkent" })
  @IsString({ message: "Shahar matn ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Shahar bo‘sh bo‘lmasligi kerak" })
  city: string;

  @ApiProperty({ example: "41.311081, 69.240562" })
  @IsString({ message: "Joylashuv matn ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Joylashuv bo‘sh bo‘lmasligi kerak" })
  location: string;
}
