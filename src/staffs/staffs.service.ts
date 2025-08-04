import { Injectable } from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StaffsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStaffDto: CreateStaffDto) {
    const staff = await this.prisma.staffs.create({
      data: {
        staff_role_id: createStaffDto.staff_role_id,
        hotel_id: createStaffDto.hotel_id,
        user_id: createStaffDto.user_id,
      },
    });
    return staff;
  }

  async findAll() {
    const staffs = await this.prisma.staffs.findMany();
    return staffs;
  }

  async findOne(id: number) {
    const staff = await this.prisma.staffs.findUnique({
      where: {
        id: id,
      },
    });
    return staff;
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.prisma.staffs.update({
      where: {
        id: id,
      },
      data: updateStaffDto,
    });
    return staff;
  }

  async remove(id: number) {
    const staff = await this.prisma.staffs.delete({
      where: {
        id: id,
      },
    });
    return staff;
  }
}
