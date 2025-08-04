import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = await this.prisma.payments.create({
      data: {
        ...createPaymentDto,
        status: "pending",
      },
    });
    return payment;
  }

  async findAll() {
    const payments = await this.prisma.payments.findMany();
    return payments;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const payment = await this.prisma.payments.findUnique({
      where: {
        id,
      },
    });
    return `Payment #${id} topildi`;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const payment = await this.prisma.payments.update({
      where: {
        id,
      },
      data: updatePaymentDto,
    });
    return `Payment #${id} ozgartirildi`;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const payment = await this.prisma.payments.delete({
      where: {
        id,
      },
    });
    return `Payment #${id} ochirildi`;
  }
}
