import { Injectable } from "@nestjs/common";
import { CreateMinibarDto } from "./dto/create-minibar.dto";
import { UpdateMinibarDto } from "./dto/update-minibar.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MinibarService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMinibarDto: CreateMinibarDto) {
    const minibar = await this.prisma.minibar.create({
      data: createMinibarDto,
    });
    return minibar;
  }

  async findAll() {
    const minibars = await this.prisma.minibar.findMany();
    return minibars;
  }

  async findOne(id: number) {
    const minibar = await this.prisma.minibar.findUnique({ where: { id } });
    return minibar;
  }

  async update(id: number, updateMinibarDto: UpdateMinibarDto) {
    const updatedMinibar = await this.prisma.minibar.update({
      where: { id },
      data: updateMinibarDto,
    });
    return updatedMinibar;
  }

  async remove(id: number) {
    const deleted = await this.prisma.minibar.delete({ where: { id } });
    return deleted;
  }
}
