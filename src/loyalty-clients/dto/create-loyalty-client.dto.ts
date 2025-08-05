import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLoyaltyClientDto {
  @ApiProperty({ example: 1, description: "Mijozning ID raqami" })
  @IsNotEmpty({ message: "Mijoz ID bosh bolmasligi kerak" })
  @IsNumber({}, { message: "Mijoz ID faqat raqam bolishi kerak" })
  costumer_id: number;

  @ApiProperty({ example: 100, description: "Ballar soni" })
  @IsNotEmpty({ message: "Ballar soni bosh bolmasligi kerak" })
  @IsNumber({}, { message: "Ballar soni faqat raqam bolishi kerak" })
  @Min(0, { message: "Ballar manfiy bolmasligi kerak" })
  points: number;

  @ApiProperty({ example: "Oltin", description: "Sadoqat darajasi" })
  @IsNotEmpty({ message: "Sadoqat darajasi bosh bolmasligi kerak" })
  @IsString({ message: "Sadoqat darajasi faqat matn bolishi kerak" })
  level: string;
}
