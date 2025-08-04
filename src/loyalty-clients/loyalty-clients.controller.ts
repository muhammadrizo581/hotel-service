import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LoyaltyClientsService } from "./loyalty-clients.service";
import { CreateLoyaltyClientDto } from "./dto/create-loyalty-client.dto";
import { UpdateLoyaltyClientDto } from "./dto/update-loyalty-client.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Sadoqatli mijozlar")
@Controller("loyalty-clients")
export class LoyaltyClientsController {
  constructor(private readonly loyaltyClientsService: LoyaltyClientsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi sadoqatli mijoz qo‘shish" })
  @ApiResponse({ status: 201, description: "Mijoz muvaffaqiyatli qo‘shildi" })
  create(@Body() createLoyaltyClientDto: CreateLoyaltyClientDto) {
    return this.loyaltyClientsService.create(createLoyaltyClientDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha sadoqatli mijozlarni olish" })
  @ApiResponse({ status: 200, description: "Barcha mijozlar ro‘yxati" })
  findAll() {
    return this.loyaltyClientsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta sadoqatli mijozni olish" })
  @ApiResponse({ status: 200, description: "Topilgan mijoz" })
  @ApiResponse({ status: 404, description: "Mijoz topilmadi" })
  findOne(@Param("id") id: string) {
    return this.loyaltyClientsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Sadoqatli mijoz maʼlumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Mijoz topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateLoyaltyClientDto: UpdateLoyaltyClientDto
  ) {
    return this.loyaltyClientsService.update(+id, updateLoyaltyClientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Sadoqatli mijozni o‘chirish" })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "Mijoz topilmadi" })
  remove(@Param("id") id: string) {
    return this.loyaltyClientsService.remove(+id);
  }
}
