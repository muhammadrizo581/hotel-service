import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class SelfGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.sub) {
      throw new ForbiddenException("Foydalanuvchi aniqlanmadi");
    }

    const paramId = parseInt(request.params.id, 10);
    const isAdmin = user.role === "admin";

    if (isNaN(paramId)) {
      throw new ForbiddenException("ID notogri");
    }

    if (isAdmin || user.sub === paramId) {
      return true;
    }

    throw new ForbiddenException("Sizga bu amalni bajarishga ruxsat yoq");
  }
}
