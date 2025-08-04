import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceDto {
  @ApiProperty({ example: "Tozalash xizmati", description: "Xizmat nomi" })
  @IsString({ message: "nom faqat matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "nom bo‘sh bo‘lmasligi kerak" })
  name: string;

  @ApiProperty({ example: 50000, description: "Xizmat narxi so‘mda" })
  @IsNumber({}, { message: "narx raqam bo‘lishi kerak" })
  @Min(0, { message: "narx manfiy bo‘lmasligi kerak" })
  price: number;
}
