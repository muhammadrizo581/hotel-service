import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: "Buyurtma ID raqami" })
  @IsNumber({}, { message: "buyurtma ID son bolishi shart" })
  @IsNotEmpty({ message: "buyurtma ID bosh bolmasligi kerak" })
  booking_id: number;

  @ApiProperty({ example: 150000, description: "Tolov miqdori" })
  @IsNumber({}, { message: "tolov miqdori son bolishi shart" })
  @Min(1, { message: "tolov miqdori kamida 1 bolishi kerak" })
  amount: number;

  @ApiProperty({
    example: "naqd",
    description: "Tolov usuli (masalan: naqd, karta)",
  })
  @IsString({ message: "tolov usuli matn bolishi kerak" })
  @IsNotEmpty({ message: "tolov usuli bosh bolmasligi kerak" })
  method: string;

  @ApiProperty({
    example: "tolangan",
    description: "Tolov holati (masalan: tolangan, kutmoqda)",
  })
  @IsString({ message: "tolov holati matn bolishi kerak" })
  @IsNotEmpty({ message: "tolov holati bosh bolmasligi kerak" })
  status: string;
}
