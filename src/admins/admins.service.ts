import { ConflictException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const isExist = await this.prisma.admin.findFirst({
      where: {
        email: createAdminDto.email,
      }, 
    });
    if (isExist) {
      throw new ConflictException("Bu emailda admin mavjud");
    }
    const admin = await this.prisma.admin.create({
      data: createAdminDto,
    });
    return admin;
  }

  async findAll() {
    return this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id: id,
      },
    });
    return admin;
  }

  async findByEmail(email: string) {
    const admin = await this.prisma.admin.findFirst({
      where: {
        email: email,
      },
    });
    if (!admin) {
      throw new Error("Bu emailda admin mavjud emas");
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.prisma.admin.update({
      where: {
        id: id,
      },
      data: updateAdminDto,
    });
    return admin;
  }

  async remove(id: number) {
    const admin = await this.prisma.admin.delete({
      where: {
        id: id,
      },
    });
    return admin;
  }
}
