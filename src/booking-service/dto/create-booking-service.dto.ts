import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateBookingServiceDto {
  @ApiProperty({ example: 1, description: "Service ID raqami" })
  @IsInt({ message: "service_id butun son bolishi kerak" })
  service_id: number;

  @ApiProperty({ example: 2, description: "Booking ID raqami" })
  @IsInt({ message: "booking_id butun son bolishi kerak" })
  booking_id: number;
}
