import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsDateString,
  IsString,
  Min,
  IsNotEmpty,
} from "class-validator";

export class CreateBookingDto {
  @ApiProperty({ example: 1, description: "Xona ID raqami" })
  @IsInt({ message: "room_id butun son bolishi kerak" })
  @Min(1, { message: "room_id 1 dan katta bolishi kerak" })
  room_id: number;

  @ApiProperty({ example: 5, description: "Mijoz (customer) ID raqami" })
  @IsInt({ message: "customer_id butun son bolishi kerak" })
  @Min(1, { message: "customer_id 1 dan katta bolishi kerak" })
  customer_id: number;

  @ApiProperty({ example: "2025-08-10", description: "Kirish sanasi" })
  @IsDateString({}, { message: "checkin_date sana formatida bolishi kerak" })
  checkin_date: Date;

  @ApiProperty({ example: "2025-08-15", description: "Chiqish sanasi" })
  @IsDateString({}, { message: "checkout_date sana formatida bolishi kerak" })
  checkout_date: Date;

  @ApiProperty({ example: "active", description: "Booking holati" })
  @IsString({ message: "status satr (string) formatida bolishi kerak" })
  @IsNotEmpty({ message: "status toldirilishi shart" })
  status: string;
}
