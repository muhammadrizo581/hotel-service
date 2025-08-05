import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();


    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("Token topilmadi");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token topilmadi");
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY_ADMIN,
      });
    } catch {
      throw new UnauthorizedException("Token yaroqsiz");
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: payload.sub },
    });

    if (!admin) {
      throw new UnauthorizedException("Admin topilmadi");
    }

    if (!admin.is_creator) {
      throw new ForbiddenException(
        "Siz is_creator emassiz"
      );
    }

    return true;
  }
}
