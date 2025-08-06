import { IsString, MinLength, Matches } from "class-validator";

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  old_password?: string;

  @IsString()
  @MinLength(6)
  new_password: string;

  @IsString()
  @MinLength(6)
  confirm_password: string;
}
