import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStaffRoleDto } from "./dto/create-staff-role.dto";
import { UpdateStaffRoleDto } from "./dto/update-staff-role.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StaffRolesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStaffRoleDto: CreateStaffRoleDto) {
    const createdStaffRole = await this.prisma.staff_roles.create({
      data: createStaffRoleDto,
    });
    return createdStaffRole;
  }

  async findAll() {
    const staffRoles = await this.prisma.staff_roles.findMany();
    return staffRoles;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const staffRole = await this.prisma.staff_roles.findUnique({
      where: { id },
    });
    return staffRole;
  }

  async update(id: number, updateStaffRoleDto: UpdateStaffRoleDto) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const updatedStaffRole = await this.prisma.staff_roles.update({
      where: { id },
      data: updateStaffRoleDto,
    });
    return `Staff role ${id} yangilandi\n${updatedStaffRole}`;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const deletedStaffRole = await this.prisma.staff_roles.delete({
      where: { id },
    });
    return `Staff role ${id} ochirildi`;
  }
}
