import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  Min,
  Max,
  IsDateString,
} from "class-validator";

export class CreateDiscountDto {
  @ApiProperty({
    example: "Yozgi chegirma",
    description: "Chegirma sarlavhasi",
  })
  @IsString({ message: "title satr bolishi kerak" })
  @IsNotEmpty({ message: "title toldirilishi shart" })
  @MaxLength(100, {
    message: "title eng kopi 100 belgidan iborat bolishi mumkin",
  })
  title: string;

  @ApiProperty({
    example: "Yozda barcha xonalarga 10% chegirma",
    description: "Chegirma tavsifi",
  })
  @IsString({ message: "description satr bolishi kerak" })
  @IsNotEmpty({ message: "description toldirilishi shart" })
  description: string;

  @ApiProperty({ example: 10, description: "Chegirma foizi (0 dan 100 gacha)" })
  @IsInt({ message: "discount_percent butun son bolishi kerak" })
  @Min(0, { message: "discount_percent 0 dan kam bolmasligi kerak" })
  @Max(100, { message: "discount_percent 100 dan oshmasligi kerak" })
  discount_percent: number;

  @ApiProperty({
    example: "2025-08-10",
    description: "Boshlanish sanasi (ISO format)",
  })
  @IsDateString(
    {},
    { message: "start_date tog‘ri sana formatida bolishi kerak (YYYY-MM-DD)" }
  )
  start_date: Date;

  @ApiProperty({
    example: "2025-08-20",
    description: "Tugash sanasi (ISO format)",
  })
  @IsDateString(
    {},
    { message: "end_date tog‘ri sana formatida bolishi kerak (YYYY-MM-DD)" }
  )
  end_date: Date;

  @ApiProperty({ example: 2, description: "Room Type ID raqami" })
  @IsInt({ message: "room_type_id butun son bolishi kerak" })
  @Min(1, { message: "room_type_id 1 dan katta bolishi kerak" })
  room_type_id: number;
}
