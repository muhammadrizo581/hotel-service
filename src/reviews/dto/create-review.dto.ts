import { IsNotEmpty, IsNumber, IsString, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: "Mehmonxona ID raqami" })
  @IsNumber({}, { message: "mehmonxona ID raqami son bolishi kerak" })
  @IsNotEmpty({ message: "mehmonxona ID raqami bosh bolmasligi kerak" })
  hotel_id: number;

  @ApiProperty({ example: 2, description: "Mijoz ID raqami" })
  @IsNumber({}, { message: "mijoz ID raqami son bolishi kerak" })
  @IsNotEmpty({ message: "mijoz ID raqami bosh bolmasligi kerak" })
  customer_id: number;

  @ApiProperty({ example: 5, description: "Baholash (1 dan 5 gacha)" })
  @IsNumber({}, { message: "baholash son bolishi kerak" })
  @Min(1, { message: "baholash kamida 1 bolishi kerak" })
  @Max(5, { message: "baholash 5 dan katta bolmasligi kerak" })
  rating: number;

  @ApiProperty({
    example: "Xona juda toza va xizmat a’lo darajada edi.",
    description: "Sharh matni",
  })
  @IsString({ message: "ta’rif matni satr korinishida bolishi kerak" })
  @IsNotEmpty({ message: "ta’rif bosh bolmasligi kerak" })
  description: string;
}
