import { Module } from "@nestjs/common";
import { MinibarService } from "./minibar.service";
import { MinibarController } from "./minibar.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [MinibarController],
  providers: [MinibarService],
})
export class MinibarModule {}
