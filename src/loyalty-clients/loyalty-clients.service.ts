import { Injectable } from "@nestjs/common";
import { CreateLoyaltyClientDto } from "./dto/create-loyalty-client.dto";
import { UpdateLoyaltyClientDto } from "./dto/update-loyalty-client.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LoyaltyClientsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLoyaltyClientDto: CreateLoyaltyClientDto) {
    const created = await this.prisma.loyalty_clients.create({
      data: createLoyaltyClientDto,
    });
    return created;
  }

  async findAll() {
    const all = await this.prisma.loyalty_clients.findMany();
    return all;
  }

  async findOne(id: number) {
    const found = await this.prisma.loyalty_clients.findUnique({
      where: { id },
    });
    if (!found) {
      throw new Error(`Bu ${id}id dagi foydalanuvchi mavjud emas`);
    }
    return found;
  }

  async update(id: number, updateLoyaltyClientDto: UpdateLoyaltyClientDto) {
    const updated = await this.prisma.loyalty_clients.update({
      where: { id },
      data: updateLoyaltyClientDto,
    });
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.prisma.loyalty_clients.delete({ where: { id } });
    return deleted;
  }
}
