import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Reflector } from "@nestjs/core";

@Injectable()
export class IsStaffGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.sub) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }

    const staff = await this.prisma.staffs.findUnique({
      where: { user_id: user.sub },
    });

    if (!staff) {
      throw new ForbiddenException("Siz staff emassiz");
    }

    return true;
  }
}
