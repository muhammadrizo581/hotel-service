import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class IsReceptionistGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ForbiddenException("Token yoq yoki notogri");
    }

    const token = authHeader.split(" ")[1];

    const payload = this.jwtService.verify(token, {
      secret: process.env.ACCESS_TOKEN_KEY,
    });

    const userId = payload.sub;

    if (!userId) {
      throw new ForbiddenException("Foydalanuvchi aniqlanmadi");
    }

    const staff = await this.prisma.staffs.findFirst({
      where: { user_id: userId },
      include: {
        Staff_roles: true,
      },
    });

    if (!staff || !staff.Staff_roles) {
      throw new ForbiddenException("Bu role uchun huquq yoq");
    }

    const isReceptionist = staff.Staff_roles.name === "receptionist";

    if (!isReceptionist) {
      throw new ForbiddenException(
        "Faqat receptionistlar uchun ruxsat etilgan"
      );
    }

    return true;
  }
}
