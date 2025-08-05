import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token topilmadi");
    }

    const token = authHeader.split(" ")[1];

    let payload: any;

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch {
      try {
        payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.ACCESS_TOKEN_KEY_ADMIN,
        });
      } catch {
        throw new UnauthorizedException("Token yaroqsiz");
      }
    }

    (request as any).user = payload;
    return true;
  }
}
