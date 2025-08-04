import { Response } from "express";
import {
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

    // await this.mailService.sendActivationLink(
    //   user.name,
    //   user.surname,
    //   user.email,
    //   activationLink
    // );

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
      throw new NotFoundException("Noto‘g‘ri aktivatsiya linki");
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
    };

    const tokens = await this.generateUserTokens(payload);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refreshToken(res: Response) {
    const refreshToken = res.cookies.refresh_token;

    if (!refreshToken) {
      throw new NotFoundException("Refresh token not found");
    }

    const payload = this.jwtService.decode(refreshToken);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const tokens = await this.generateUserTokens(payload);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      },
    };
  }
  async logoutUserFromCookie(res: Response, refreshToken: string | undefined) {
    if (!refreshToken) {
      res.clearCookie("refreshToken", { httpOnly: true });
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
      res.clearCookie("refreshToken", { httpOnly: true });
      throw new UnauthorizedException("Refresh token yaroqsiz");
    }

    res.clearCookie("refreshToken", { httpOnly: true });
    return { message: "Chiqish muvaffaqiyatli amalga oshirildi" };
  }
}
