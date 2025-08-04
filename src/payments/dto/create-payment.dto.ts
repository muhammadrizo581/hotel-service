import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: "Buyurtma ID raqami" })
  @IsNumber({}, { message: "buyurtma ID son bo‘lishi shart" })
  @IsNotEmpty({ message: "buyurtma ID bo‘sh bo‘lmasligi kerak" })
  booking_id: number;

  @ApiProperty({ example: 150000, description: "To‘lov miqdori" })
  @IsNumber({}, { message: "to‘lov miqdori son bo‘lishi shart" })
  @Min(1, { message: "to‘lov miqdori kamida 1 bo‘lishi kerak" })
  amount: number;

  @ApiProperty({
    example: "naqd",
    description: "To‘lov usuli (masalan: naqd, karta)",
  })
  @IsString({ message: "to‘lov usuli matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "to‘lov usuli bo‘sh bo‘lmasligi kerak" })
  method: string;

  @ApiProperty({
    example: "to‘langan",
    description: "To‘lov holati (masalan: to‘langan, kutmoqda)",
  })
  @IsString({ message: "to‘lov holati matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "to‘lov holati bo‘sh bo‘lmasligi kerak" })
  status: string;
}
