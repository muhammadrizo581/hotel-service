import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHotelDto {
  @ApiProperty({ example: "ozbekiston Mehmonxonasi" })
  @IsString({ message: "Nomi matn korinishida bolishi kerak" })
  @IsNotEmpty({ message: "Nomi bosh bolmasligi kerak" })
  name: string;

  @ApiProperty({ example: "Toshkent shahar, Amir Temur kochasi, 12-uy" })
  @IsString({ message: "Manzil matn korinishida bolishi kerak" })
  @IsNotEmpty({ message: "Manzil bosh bolmasligi kerak" })
  address: string;

  @ApiProperty({ example: "Toshkent" })
  @IsString({ message: "Shahar matn korinishida bolishi kerak" })
  @IsNotEmpty({ message: "Shahar bosh bolmasligi kerak" })
  city: string;

  @ApiProperty({ example: "41.311081, 69.240562" })
  @IsString({ message: "Joylashuv matn korinishida bolishi kerak" })
  @IsNotEmpty({ message: "Joylashuv bosh bolmasligi kerak" })
  location: string;
}
