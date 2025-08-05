import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceDto {
  @ApiProperty({ example: "Tozalash xizmati", description: "Xizmat nomi" })
  @IsString({ message: "nom faqat matn bolishi kerak" })
  @IsNotEmpty({ message: "nom bosh bolmasligi kerak" })
  name: string;

  @ApiProperty({ example: 50000, description: "Xizmat narxi somda" })
  @IsNumber({}, { message: "narx raqam bolishi kerak" })
  @Min(0, { message: "narx manfiy bolmasligi kerak" })
  price: number;
}
