import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffDto {
  @ApiProperty({ example: 1, description: "Xodim roli ID raqami" })
  @IsNotEmpty({ message: "Roli ID bo‘sh bo‘lmasligi kerak" })
  @IsNumber({}, { message: "Roli ID butun son bo‘lishi kerak" })
  staff_role_id: number;

  @ApiProperty({ example: 2, description: "Mehmonxona ID raqami" })
  @IsNotEmpty({ message: "Mehmonxona ID bo‘sh bo‘lmasligi kerak" })
  @IsNumber({}, { message: "Mehmonxona ID butun son bo‘lishi kerak" })
  hotel_id: number;

  @ApiProperty({ example: 3, description: "Foydalanuvchi ID raqami" })
  @IsNotEmpty({ message: "Foydalanuvchi ID bo‘sh bo‘lmasligi kerak" })
  @IsNumber({}, { message: "Foydalanuvchi ID butun son bo‘lishi kerak" })
  user_id: number;
}
