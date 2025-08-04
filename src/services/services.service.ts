import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = await this.prisma.services.create({
      data: createServiceDto,
    });
    return service;
  }

  async findAll() {
    const services = await this.prisma.services.findMany();
    return services;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("ID is required");
    }
    const service = await this.prisma.services.findUnique({
      where: {
        id,
      },
    });
    return `Service #${id} topildi\n${service}`;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    if (!id) {
      throw new BadRequestException("ID is required");
    }
    const service = await this.prisma.services.update({
      where: {
        id,
      },
      data: updateServiceDto,
    });
    return `Service #${id} ozgartirildi\n${service}`;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException("ID is required");
    }
    const service = await this.prisma.services.delete({
      where: {
        id,
      },
    });
    return `Service #${id} ochirildi`;
  }
}
