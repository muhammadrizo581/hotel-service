import { Injectable, NotFoundException } from "@nestjs/common";
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

  async login(loginUserDto: LoginUserDto) {
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
    return this.generateUserTokens(payload);
  }
}
