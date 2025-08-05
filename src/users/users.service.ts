import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const isValidEmail = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (isValidEmail) {
      throw new Error("Bunday email bn allaqachon royxatdan o'tgan");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        hashed_refresh_token: "",
        role: "customer",
        is_active: false,
      },
    });

    if (user.role !== "staff" && user.role !== "customer") {
      throw new Error("Role faqat staff va customer bo'lishi mumkin");
    }

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    if (!id) {
      throw new Error("Iltimos ID-ni kiriting");
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error(`Bu ${id}id dagi foydalanuvchi mavjud emas`);
    }
    return `${id}-id dagi foydalanuvchi ${user}`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!id) {
      throw new Error("Iltimos ID-ni kiriting");
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error(`Bu ${id}id dagi foydalanuvchi mavjud emas`);
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return `${id}-id dagi foydalanuvchi yangilandi${updatedUser}`;
  }

  async remove(id: number) {
    const deletedUser = await this.prisma.user.delete({ where: { id } });
    return `${id}-id dagi foydalanuvchi ochirildi`;
  }

  async removeAll() {
    const deletedUsers = await this.prisma.user.deleteMany();
    return `Barcha foydalanuvchilar ochirildi`;
  }
}
