import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "Ali", description: "Foydalanuvchining ismi" })
  @IsString({ message: "Ism faqat matn bolishi kerak" })
  @IsNotEmpty({ message: "Ism bosh bolmasligi kerak" })
  name: string;

  @ApiProperty({
    example: "Valiyev",
    description: "Foydalanuvchining familiyasi",
  })
  @IsString({ message: "Familiya faqat matn bolishi kerak" })
  @IsNotEmpty({ message: "Familiya bosh bolmasligi kerak" })
  surname: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @IsEmail({}, { message: "Togri email kiriting" })
  @IsNotEmpty({ message: "Email bosh bolmasligi kerak" })
  email: string;

  @ApiProperty({
    example: "customer",
    description: "Foydalanuvchining roli (masalan: customer, staff)",
  })
  @IsString({ message: "Rol faqat matn bolishi kerak" })
  @IsNotEmpty({ message: "Rol bosh bolmasligi kerak" })
  role: string;

  @ApiProperty({
    example: "MySecret123",
    description: "Foydalanuvchining paroli",
  })
  @IsString({ message: "Parol faqat matn bolishi kerak" })
  @IsNotEmpty({ message: "Parol bosh bolmasligi kerak" })
  password: string;

  @ApiProperty({
    example: "somehashedtoken123",
    description: "Refresh token (majburiy emas)",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Refresh token faqat matn bolishi kerak" })
  hashed_refresh_token?: string;
}
