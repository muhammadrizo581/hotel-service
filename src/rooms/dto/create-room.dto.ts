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
  @IsNotEmpty({ message: "Xona turi ID bosh bolishi mumkin emas" })
  @IsInt({ message: "Xona turi ID butun son bolishi kerak" })
  room_type_id: number;

  @ApiProperty({ example: 2, description: "Mehmonxona ID raqami" })
  @IsNotEmpty({ message: "Mehmonxona ID bosh bolishi mumkin emas" })
  @IsInt({ message: "Mehmonxona ID butun son bolishi kerak" })
  hotel_id: number;

  @ApiProperty({ example: "A102", description: "Xona raqami" })
  @IsNotEmpty({ message: "Xona raqami bosh bolishi mumkin emas" })
  @IsString({ message: "Xona raqami matn bolishi kerak" })
  room_number: string;

  @ApiProperty({ example: 450000, description: "Xona narxi somda" })
  @IsNotEmpty({ message: "Narx bosh bolishi mumkin emas" })
  @IsPositive({ message: "Narx musbat son bolishi kerak" })
  price: number;

  @ApiProperty({ example: true, description: "Xona mavjudmi yoki yoqmi" })
  @IsNotEmpty({ message: "Mavjudlik holati korsatilishi shart" })
  @IsBoolean({
    message: "Mavjudlik qiymati faqat true yoki false bolishi kerak",
  })
  is_available: boolean;
}
