import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffRoleDto {
  @ApiProperty({
    example: "Qabulxona xodimi",
    description: "Xodimning roli nomi",
  })
  @IsNotEmpty({ message: "Rol nomi bo‘sh bo‘lmasligi kerak" })
  @IsString({ message: "Rol nomi satr ko‘rinishida bo‘lishi kerak" })
  name: string;
}
