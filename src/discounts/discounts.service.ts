import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DiscountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDiscountDto: CreateDiscountDto) {
    const discount = await this.prisma.discounts.create({
      data: createDiscountDto,
    });
    return discount;
  }

  async findAll() {
    const discounts = await this.prisma.discounts.findMany();
    return discounts;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const discount = await this.prisma.discounts.findUnique({
      where: {
        id,
      },
    });
    return discount;
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const discount = await this.prisma.discounts.update({
      where: {
        id,
      },
      data: updateDiscountDto,
    });
    return discount;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const discount = await this.prisma.discounts.delete({
      where: {
        id,
      },
    });
    return discount;
  }
}
