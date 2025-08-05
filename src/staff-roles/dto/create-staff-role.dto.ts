import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffRoleDto {
  @ApiProperty({
    example: "Qabulxona xodimi",
    description: "Xodimning roli nomi",
  })
  @IsNotEmpty({ message: "Rol nomi bosh bolmasligi kerak" })
  @IsString({ message: "Rol nomi satr korinishida bolishi kerak" })
  name: string;
}
