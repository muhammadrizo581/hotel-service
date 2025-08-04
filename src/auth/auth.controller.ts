import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { LoginUserDto } from "src/users/dto/login-user.dto";

@ApiTags("Avtorizatsiya")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Foydalanuvchini ro‘yxatdan o‘tkazish" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description:
      "Foydalanuvchi ro'yxatdan o'tdi va faollashtirish havolasi yuborildi",
  })
  @ApiResponse({
    status: 400,
    description: "Bunday email bilan foydalanuvchi allaqachon mavjud",
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Foydalanuvchini tizimga kirish" })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli tizimga kirdi",
  })
  @ApiResponse({
    status: 400,
    description: "Email yoki password notog'ri",
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
