import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    example: "ali@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "MySecret123",
    description: "Foydalanuvchining paroli",
  })
  @IsString()
  password: string;
}
