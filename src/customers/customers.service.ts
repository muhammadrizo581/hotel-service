import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class CustomersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async create(createCustomerDto: CreateCustomerDto, req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token yoq yoki notogri");
    }

    const token = authHeader.split(" ")[1];

    const decoded = this.jwtService.decode(token) as {
      email: string;
      role: string;
      sub: number;
    };

    if (!decoded || !decoded.email) {
      throw new UnauthorizedException("Tokendan email ajratib bolmadi");
    }
    if (!decoded.sub) {
      throw new UnauthorizedException("Tokendan id ni ajratib bolmadi");
    }

    const role = decoded.role;

    const id = decoded.sub;
    if (role !== "customer") {
      throw new UnauthorizedException("Siz faqat customer bo'lishingiz mumkin");
    }

    const customer = await this.prisma.customers.create({
      data: {
        ...createCustomerDto,
        user_id: id,
      },
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
    return customer;
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
    return updatedCustomer;
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
    return `${deletedCustomer.id}id dagi mijoz muvaffaqiyatli ochirildi`;
  }
}
