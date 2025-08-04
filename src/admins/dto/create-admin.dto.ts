import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({ example: "Ali Karimov", description: "Adminning toliq ismi" })
  @IsString({ message: "Ism string formatda bolishi kerak" })
  full_name: string;

  @ApiProperty({
    example: "admin@example.com",
    description: "Adminning email manzili",
  })
  @IsEmail({}, { message: "Email togri formatda bolishi kerak" })
  email: string;

  @ApiProperty({
    example: "StrongP@ssw0rd",
    description: "Parol (kamida 6 ta belgidan iborat)",
  })
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bolishi kerak" })
  password: string;

  @ApiProperty({
    example: true,
    description: "Agar admin asosiy yaratuvchi bolsa true boladi",
  })
  @IsBoolean({ message: "is_creator faqat true yoki false bolishi mumkin" })
  is_creator: boolean;
}
