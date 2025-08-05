import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { LoyaltyClientsService } from "./loyalty-clients.service";
import { CreateLoyaltyClientDto } from "./dto/create-loyalty-client.dto";
import { UpdateLoyaltyClientDto } from "./dto/update-loyalty-client.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsReceptionistGuard } from "src/common/guards/is-receptionist.guard";

@ApiTags("Sadoqatli mijozlar")
@Controller("loyalty-clients")
export class LoyaltyClientsController {
  constructor(private readonly loyaltyClientsService: LoyaltyClientsService) {}

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Post()
  @ApiOperation({ summary: "Yangi sadoqatli mijoz qoshish" })
  @ApiResponse({ status: 201, description: "Mijoz muvaffaqiyatli qoshildi" })
  create(@Body() createLoyaltyClientDto: CreateLoyaltyClientDto) {
    return this.loyaltyClientsService.create(createLoyaltyClientDto);
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Get()
  @ApiOperation({ summary: "Barcha sadoqatli mijozlarni olish" })
  @ApiResponse({ status: 200, description: "Barcha mijozlar royxati" })
  findAll() {
    return this.loyaltyClientsService.findAll();
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Get(":id")
  @ApiOperation({ summary: "Bitta sadoqatli mijozni olish" })
  @ApiResponse({ status: 200, description: "Topilgan mijoz" })
  @ApiResponse({ status: 404, description: "Mijoz topilmadi" })
  findOne(@Param("id") id: string) {
    return this.loyaltyClientsService.findOne(+id);
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
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

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Sadoqatli mijozni ochirish" })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli ochirildi" })
  @ApiResponse({ status: 404, description: "Mijoz topilmadi" })
  remove(@Param("id") id: string) {
    return this.loyaltyClientsService.remove(+id);
  }
}
