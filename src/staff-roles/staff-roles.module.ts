import { Module } from "@nestjs/common";
import { StaffRolesService } from "./staff-roles.service";
import { StaffRolesController } from "./staff-roles.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [StaffRolesController],
  providers: [StaffRolesService],
})
export class StaffRolesModule {}
