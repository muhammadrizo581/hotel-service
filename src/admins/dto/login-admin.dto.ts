import { IsEmail, MinLength } from "class-validator";

export class LoginAdminDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
