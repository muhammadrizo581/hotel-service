import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomTypeDto {
  @ApiProperty({ example: "Deluxe", description: "Xona turi nomi" })
  @IsString({ message: "Xona turi nomi matn bolishi kerak" })
  @IsNotEmpty({ message: "Xona turi nomi bosh bolishi mumkin emas" })
  name: string;

  @ApiProperty({ example: 2, description: "Nechta odam sigadi" })
  @IsNumber({}, { message: "Sigimi raqam bolishi kerak" })
  @Min(1, { message: "Sigim kamida 1 bolishi kerak" })
  capacity: number;
}
