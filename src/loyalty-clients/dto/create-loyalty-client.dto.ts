import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLoyaltyClientDto {
  @ApiProperty({ example: 1, description: "Mijozning ID raqami" })
  @IsNotEmpty({ message: "Mijoz ID bo‘sh bo‘lmasligi kerak" })
  @IsNumber({}, { message: "Mijoz ID faqat raqam bo‘lishi kerak" })
  costumer_id: number;

  @ApiProperty({ example: 100, description: "Ballar soni" })
  @IsNotEmpty({ message: "Ballar soni bo‘sh bo‘lmasligi kerak" })
  @IsNumber({}, { message: "Ballar soni faqat raqam bo‘lishi kerak" })
  @Min(0, { message: "Ballar manfiy bo‘lmasligi kerak" })
  points: number;

  @ApiProperty({ example: "Oltin", description: "Sadoqat darajasi" })
  @IsNotEmpty({ message: "Sadoqat darajasi bo‘sh bo‘lmasligi kerak" })
  @IsString({ message: "Sadoqat darajasi faqat matn bo‘lishi kerak" })
  level: string;
}
