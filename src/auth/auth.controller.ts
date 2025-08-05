import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Param,
  Req,
  ParseIntPipe,
  Get,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { Request, Response } from "express";
import { CreateAdminDto } from "src/admins/dto/create-admin.dto";
import { LoginAdminDto } from "src/admins/dto/login-admin.dto";
import { IsCreatorGuard } from "src/common/guards/is-creator.guard";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";

@ApiTags("Avtorizatsiya")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Foydalanuvchini royxatdan otkazish" })
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

  @Get("activate/:link")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Foydalanuvchini faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli faollashtirildi",
  })
  @ApiResponse({
    status: 400,
    description: "Noto'g'ri aktivatsiya linki",
  })
  async activate(@Param("link") link: string) {
    return this.authService.activate(link);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Post("activate-staff/:id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Staffni faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Staff muvaffaqiyatli faollashtirildi",
  })
  @ApiResponse({
    status: 400,
    description: "Staff topilmadi",
  })
  async activateStaff(@Param("id", ParseIntPipe) id: number) {
    return this.authService.activateStaff(id);
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
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(loginUserDto, res as any);
  }

  @Post("refresh/:user_id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Foydalanuvchini refresh qilish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli refresh qilindi",
  })
  @ApiResponse({
    status: 401,
    description: "Refresh token noto'g'ri yoki mavjud emas",
  })
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Param("user_id", ParseIntPipe) userId: number,
    @Req() req: Request
  ) {
    return this.authService.refresh(res as any, userId, req as any);
  }

  @Post("logout")
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
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.logout(
      res as any,
      req.cookies.refresh_token as string
    );
  }

  @UseGuards(IsCreatorGuard)
  @Post("create-admin")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Admin yaratish" })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Bunday email bilan admin allaqachon mavjud",
  })
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(createAdminDto);
  }

  @UseGuards(IsCreatorGuard)
  @Post("make-creator/:id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Adminni creator qilish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli creator qilindi",
  })
  @ApiResponse({
    status: 400,
    description: "Bunday admin topilmadi",
  })
  async makeCreator(@Param("id", ParseIntPipe) id: number) {
    return this.authService.makeCreator(id);
  }

  @Post("login-admin")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Adminni tizimga kirish" })
  @ApiBody({ type: LoginAdminDto })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli tizimga kirdi",
  })
  @ApiResponse({
    status: 400,
    description: "Email yoki password notog'ri",
  })
  async loginAdmin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginAdmin(loginAdminDto, res as any);
  }

  @UseGuards(AuthGuard)
  @Post("refresh-admin/:admin_id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Adminni refresh qilish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli refresh qilindi",
  })
  @ApiResponse({
    status: 401,
    description: "Refresh token noto'g'ri yoki mavjud emas",
  })
  async refreshTokenAdmin(
    @Res({ passthrough: true }) res: Response,
    @Param("admin_id", ParseIntPipe) adminId: number,
    @Req() req: Request
  ) {
    return this.authService.refreshAdmin(res as any, adminId, req as any);
  }

  @Post("logout-admin")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Adminni tizimga kirish" })
  @ApiBody({ type: LoginAdminDto })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli tizimga kirdi",
  })
  @ApiResponse({
    status: 400,
    description: "Email yoki password notogri",
  })
  async logoutAdmin(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request
  ) {
    return this.authService.logoutAdmin(
      res as any,
      req.cookies.refresh_token_admin as string
    );
  }
}
