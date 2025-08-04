import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomTypeDto {
  @ApiProperty({ example: "Deluxe", description: "Xona turi nomi" })
  @IsString({ message: "Xona turi nomi matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Xona turi nomi bo‘sh bo‘lishi mumkin emas" })
  name: string;

  @ApiProperty({ example: 2, description: "Nechta odam sig‘adi" })
  @IsNumber({}, { message: "Sig‘imi raqam bo‘lishi kerak" })
  @Min(1, { message: "Sig‘im kamida 1 bo‘lishi kerak" })
  capacity: number;
}
