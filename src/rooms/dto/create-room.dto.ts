import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {
  @ApiProperty({ example: 1, description: "Xona turi ID raqami" })
  @IsNotEmpty({ message: "Xona turi ID bo‘sh bo‘lishi mumkin emas" })
  @IsInt({ message: "Xona turi ID butun son bo‘lishi kerak" })
  room_type_id: number;

  @ApiProperty({ example: 2, description: "Mehmonxona ID raqami" })
  @IsNotEmpty({ message: "Mehmonxona ID bo‘sh bo‘lishi mumkin emas" })
  @IsInt({ message: "Mehmonxona ID butun son bo‘lishi kerak" })
  hotel_id: number;

  @ApiProperty({ example: "A102", description: "Xona raqami" })
  @IsNotEmpty({ message: "Xona raqami bo‘sh bo‘lishi mumkin emas" })
  @IsString({ message: "Xona raqami matn bo‘lishi kerak" })
  room_number: string;

  @ApiProperty({ example: 450000, description: "Xona narxi so‘mda" })
  @IsNotEmpty({ message: "Narx bo‘sh bo‘lishi mumkin emas" })
  @IsPositive({ message: "Narx musbat son bo‘lishi kerak" })
  price: number;

  @ApiProperty({ example: true, description: "Xona mavjudmi yoki yo‘qmi" })
  @IsNotEmpty({ message: "Mavjudlik holati ko‘rsatilishi shart" })
  @IsBoolean({
    message: "Mavjudlik qiymati faqat true yoki false bo‘lishi kerak",
  })
  is_available: boolean;
}
