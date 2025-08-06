import { Request, Response } from "express";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { v4 as uuidv4 } from "uuid";
import { MailService } from "src/mail/mail.service";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { CreateAdminDto } from "src/admins/dto/create-admin.dto";
import { LoginAdminDto } from "src/admins/dto/login-admin.dto";
import { ResetPasswordDto } from "src/users/dto/reset-password.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  private async generateUserTokens(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return { accessToken, refreshToken };
  }

  private async generateAdminTokens(payload: any) {
    const accessTokenAdmin = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY_ADMIN,
      expiresIn: process.env.ACCESS_TOKEN_TIME_ADMIN,
    });

    const refreshTokenAdmin = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
      expiresIn: process.env.REFRESH_TOKEN_TIME_ADMIN,
    });

    return { accessTokenAdmin, refreshTokenAdmin };
  }

  async register(createUserDto: CreateUserDto) {
    const isExist = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (isExist) {
      throw new Error("User already exists");
    }
    const activationLink = uuidv4();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        activation_link: activationLink,
      },
    });

    if (user.role !== "staff" && user.role !== "customer") {
      throw new BadRequestException(
        "Role faqat staff va customer bo'lishi mumkin"
      );
    }

    await this.mailService.sendActivationLink(
      user.name,
      user.surname,
      user.email,
      activationLink
    );

    const payload = {
      sub: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
    };

    return { message: "Royxatdan otdingiz emailni faollashtiring" };
  }

  async activate(link: string) {
    const user = await this.prisma.user.findFirst({
      where: { activation_link: link },
    });
    if (!user) {
      throw new NotFoundException("Notogri aktivatsiya linki");
    }

    if (user.is_active) {
      return { message: "Akkount allaqachon faollashtirilgan" };
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { is_active: true },
    });

    return { message: "Akkount muvaffaqiyatli faollashtirildi" };
  }

  async activateStaff(id: number) {
    const user = await this.prisma.staffs.findFirst({
      where: { user_id: id },
    });
    if (!user) {
      throw new NotFoundException("Staff topilmadi");
    }

    if (user.is_verified_by_admin) {
      return { message: "Staff allaqachon faollashtirilgan" };
    }

    await this.prisma.staffs.update({
      where: { id: user.id },
      data: { is_verified_by_admin: true },
    });

    return { message: "Staff muvaffaqiyatli faollashtirildi" };
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new NotFoundException("Email yoki password notogri");
    }

    const isPasswordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new NotFoundException("Email yoki password notogri");
    }

    const payload = {
      sub: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    };

    const tokens = await this.generateUserTokens(payload);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { hashed_refresh_token: tokens.refreshToken },
    });

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: "Muvaffaqiyatli tizimga kirdingiz",
      accessToken: tokens.accessToken,
    };
  }

  async refresh(res: Response, userId: number, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }

    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token topilmadi");
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch {
      throw new UnauthorizedException(
        "Refresh token yaroqsiz yoki muddati tugagan"
      );
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME ?? "15m",
    });

    const newRefreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME ?? "7d",
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { hashed_refresh_token: newRefreshToken },
    });

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: parseInt(process.env.COOKIE_TIME ?? "1296000000", 10), // 15d
    });

    return {
      accessToken: newAccessToken,
    };
  }

  async logout(res: Response, refreshToken: string | undefined) {
    if (!refreshToken) {
      res.clearCookie("refresh_token", { httpOnly: true });
      throw new UnauthorizedException("Refresh token mavjud emas");
    }

    try {
      const payload: any = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      await this.prisma.user.update({
        where: { id: payload.sub },
        data: { hashed_refresh_token: "" },
      });
    } catch {
      res.clearCookie("refresh_token", { httpOnly: true });
      throw new UnauthorizedException("Refresh token yaroqsiz");
    }

    res.clearCookie("refresh_token", { httpOnly: true });
    return { message: "Chiqish muvaffaqiyatli amalga oshirildi" };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token yoq yoki notogri");
    }

    const token = authHeader.split(" ")[1];

    const decoded = this.jwtService.decode(token) as { email: string };

    const role = this.jwtService.decode(token) as { role: string };

    if (!decoded || !decoded.email) {
      throw new UnauthorizedException("Tokendan email ajratib bolmadi");
    }

    if (!role || !role.role) {
      throw new UnauthorizedException("Tokendan role ajratib bolmadi");
    }

    if (role.role === "admin") {
      const email = decoded.email;

      const user = await this.prisma.admin.findUnique({
        where: { email },
      });

      const { old_password, new_password, confirm_password } = resetPasswordDto;

      if (!user) {
        throw new NotFoundException("Foydalanuvchi topilmadi");
      }

      const isPasswordMatch = await bcrypt.compare(
        old_password!,
        user.password
      );

      if (!isPasswordMatch) {
        throw new UnauthorizedException("Eski parol notog'ri");
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);

      await this.prisma.admin.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return { message: "Parol muvaffaqiyatli o'zgartirildi" };
    }

    const email = decoded.email;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    const { old_password, new_password, confirm_password } = resetPasswordDto;

    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }

    const isPasswordMatch = await bcrypt.compare(old_password!, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException("Eski parol notog'ri");
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { message: "Parol muvaffaqiyatli o'zgartirildi" };
  }

  async createAdmin(dto: CreateAdminDto) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    if (existingAdmin) {
      throw new BadRequestException("Bu email bilan admin allaqachon mavjud");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newAdmin = await this.prisma.admin.create({
      data: {
        full_name: dto.full_name,
        email: dto.email,
        password: hashedPassword,
        is_creator: false,
      },
    });

    return {
      message: "Admin muvaffaqiyatli yaratildi",
      admin: {
        id: newAdmin.id,
        full_name: newAdmin.full_name,
        email: newAdmin.email,
        is_creator: newAdmin.is_creator,
      },
    };
  }

  async makeCreator(id: number) {
    const admin = await this.prisma.admin.update({
      where: { id },
      data: { is_creator: true },
    });
    return { message: "Admin muvaffaqiyatli yaratildi", admin };
  }

  async loginAdmin(dto: LoginAdminDto, res: Response) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    if (!admin) throw new NotFoundException("Email yoki password notog'ri");

    const isPasswordMatch = await bcrypt.compare(dto.password, admin.password);

    if (!isPasswordMatch)
      throw new NotFoundException("Email yoki password notog'ri");

    const payload = {
      sub: admin.id,
      full_name: admin.full_name,
      email: admin.email,
      is_creator: admin.is_creator,
      role: admin.role,
    };

    const tokens = await this.generateAdminTokens(payload);
    await this.prisma.admin.update({
      where: { id: admin.id },
      data: { hashed_refresh_token_admin: tokens.refreshTokenAdmin },
    });

    res.cookie("refresh_token_admin", tokens.refreshTokenAdmin, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: "Admin muvaffaqiyatli tizimga kirdingiz",
      accessTokenAdmin: tokens.accessTokenAdmin,
    };
  }

  async refreshAdmin(res: Response, userId: number, req: Request) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: userId },
    });

    if (!admin) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }

    const refreshToken = req.cookies?.refresh_token_admin;

    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token topilmadi");
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
      });
    } catch {
      throw new UnauthorizedException(
        "Refresh token yaroqsiz yoki muddati tugagan"
      );
    }

    const payload = {
      sub: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
    };

    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY_ADMIN,
      expiresIn: process.env.ACCESS_TOKEN_TIME_ADMIN ?? "15m",
    });

    const newRefreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
      expiresIn: process.env.REFRESH_TOKEN_TIME_ADMIN ?? "7d",
    });

    await this.prisma.admin.update({
      where: { id: admin.id },
      data: { hashed_refresh_token_admin: newRefreshToken },
    });

    res.cookie("refresh_token_admin", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: parseInt(process.env.COOKIE_TIME_ADMIN ?? "1296000000", 10),
    });

    return {
      accessTokenAdmin: newAccessToken,
    };
  }

  async logoutAdmin(res: Response, refreshToken: string | undefined) {
    if (!refreshToken) {
      res.clearCookie("refresh_token_admin", { httpOnly: true });
      throw new UnauthorizedException("Refresh token mavjud emas");
    }

    try {
      const payload: any = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
      });

      await this.prisma.admin.update({
        where: { id: payload.sub },
        data: { hashed_refresh_token_admin: "" },
      });
    } catch {
      res.clearCookie("refresh_token_admin", { httpOnly: true });
      throw new UnauthorizedException("Refresh token yaroqsiz");
    }

    res.clearCookie("refresh_token_admin", { httpOnly: true });
    return { message: "Chiqish muvaffaqiyatli amalga oshirildi" };
  }
}
