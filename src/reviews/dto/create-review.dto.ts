import { IsNotEmpty, IsNumber, IsString, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: "Mehmonxona ID raqami" })
  @IsNumber({}, { message: "mehmonxona ID raqami son bo‘lishi kerak" })
  @IsNotEmpty({ message: "mehmonxona ID raqami bo‘sh bo‘lmasligi kerak" })
  hotel_id: number;

  @ApiProperty({ example: 2, description: "Mijoz ID raqami" })
  @IsNumber({}, { message: "mijoz ID raqami son bo‘lishi kerak" })
  @IsNotEmpty({ message: "mijoz ID raqami bo‘sh bo‘lmasligi kerak" })
  customer_id: number;

  @ApiProperty({ example: 5, description: "Baholash (1 dan 5 gacha)" })
  @IsNumber({}, { message: "baholash son bo‘lishi kerak" })
  @Min(1, { message: "baholash kamida 1 bo‘lishi kerak" })
  @Max(5, { message: "baholash 5 dan katta bo‘lmasligi kerak" })
  rating: number;

  @ApiProperty({
    example: "Xona juda toza va xizmat a’lo darajada edi.",
    description: "Sharh matni",
  })
  @IsString({ message: "ta’rif matni satr ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "ta’rif bo‘sh bo‘lmasligi kerak" })
  description: string;
}
