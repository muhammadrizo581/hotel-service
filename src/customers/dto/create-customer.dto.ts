import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  Min,
  IsString,
  IsNotEmpty,
  Length,
  Matches,
} from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({ example: 1, description: "User ID raqami" })
  @IsInt({ message: "user_id butun son bolishi kerak" })
  @Min(1, { message: "user_id 1 dan katta bolishi kerak" })
  user_id: number;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsString({ message: "phone satr bolishi kerak" })
  @Matches(/^\+998\d{9}$/, {
    message: "phone +998 bilan boshlanuvchi 9 ta raqam bolishi kerak",
  })
  phone: string;

  @ApiProperty({ example: "2003-05-10", description: "Tugilgan sana" })
  @IsString({ message: "birthday sana formatida bolishi kerak (YYYY-MM-DD)" })
  birthday: string;

  @ApiProperty({
    example: "2030-05-10",
    description: "Pasport muddati tugash sanasi",
  })
  @IsString({
    message: "expiry_date sana formatida bolishi kerak (YYYY-MM-DD)",
  })
  expiry_date: string;

  @ApiProperty({ example: "AA1234567", description: "Pasport raqami" })
  @IsString({ message: "passport_no satr bolishi kerak" })
  @Length(9, 9, { message: "passport_no 9 ta belgidan iborat bolishi kerak" })
  passport_no: string;
}
