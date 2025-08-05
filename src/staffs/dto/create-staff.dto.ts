import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffDto {
  @ApiProperty({ example: 1, description: "Xodim roli ID raqami" })
  @IsNotEmpty({ message: "Roli ID bosh bolmasligi kerak" })
  @IsNumber({}, { message: "Roli ID butun son bolishi kerak" })
  staff_role_id: number;

  @ApiProperty({ example: 2, description: "Mehmonxona ID raqami" })
  @IsNotEmpty({ message: "Mehmonxona ID bosh bolmasligi kerak" })
  @IsNumber({}, { message: "Mehmonxona ID butun son bolishi kerak" })
  hotel_id: number;

  @ApiProperty({ example: 3, description: "Foydalanuvchi ID raqami" })
  @IsNotEmpty({ message: "Foydalanuvchi ID bosh bolmasligi kerak" })
  @IsNumber({}, { message: "Foydalanuvchi ID butun son bolishi kerak" })
  user_id: number;
}
