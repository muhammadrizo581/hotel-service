import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "Ali", description: "Foydalanuvchining ismi" })
  @IsString({ message: "Ism faqat matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Ism bo‘sh bo‘lmasligi kerak" })
  name: string;

  @ApiProperty({
    example: "Valiyev",
    description: "Foydalanuvchining familiyasi",
  })
  @IsString({ message: "Familiya faqat matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Familiya bo‘sh bo‘lmasligi kerak" })
  surname: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @IsEmail({}, { message: "To‘g‘ri email kiriting" })
  @IsNotEmpty({ message: "Email bo‘sh bo‘lmasligi kerak" })
  email: string;

  @ApiProperty({
    example: "customer",
    description: "Foydalanuvchining roli (masalan: customer, staff)",
  })
  @IsString({ message: "Rol faqat matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Rol bo‘sh bo‘lmasligi kerak" })
  role: string;

  @ApiProperty({
    example: "MySecret123",
    description: "Foydalanuvchining paroli",
  })
  @IsString({ message: "Parol faqat matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Parol bo‘sh bo‘lmasligi kerak" })
  password: string;

  @ApiProperty({
    example: "somehashedtoken123",
    description: "Refresh token (majburiy emas)",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Refresh token faqat matn bo‘lishi kerak" })
  hashed_refresh_token?: string;
}
