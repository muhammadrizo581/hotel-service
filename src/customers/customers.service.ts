import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.prisma.customers.create({
      data: createCustomerDto,
    });
    return customer;
  }

  async findAll() {
    return await this.prisma.customers.findMany();
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const customer = await this.prisma.customers.findUnique({ where: { id } });
    if (!customer) {
      throw new BadRequestException(
        `Bu ${id}id dagi foydalanuvchi mavjud emas`
      );
    }
    return `Customer ${id} topildi\n${customer}`;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const customer = await this.prisma.customers.findUnique({ where: { id } });
    if (!customer) {
      throw new BadRequestException(
        `Bu ${id}id dagi foydalanuvchi mavjud emas`
      );
    }
    const updatedCustomer = await this.prisma.customers.update({
      where: { id },
      data: updateCustomerDto,
    });
    return `Customer ${id} yangilandi\n${updatedCustomer}`;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const customer = await this.prisma.customers.findUnique({ where: { id } });
    if (!customer) {
      throw new BadRequestException(
        `Bu ${id}id dagi foydalanuvchi mavjud emas`
      );
    }
    const deletedCustomer = await this.prisma.customers.delete({
      where: { id },
    });
    return `Customer ${id} ochirildi\n${deletedCustomer}`;
  }
}
