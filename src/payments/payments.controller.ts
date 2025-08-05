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
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";
import { SelfGuard } from "src/common/guards/self.guard";

@ApiTags("Tolovlar") // Swagger'da bolim nomi
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard,IsAdminGuard)
  @Post()
  @ApiOperation({ summary: "Yangi tolov qoshish" })
  @ApiResponse({ status: 201, description: "Tolov muvaffaqiyatli yaratildi" })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(AuthGuard,IsAdminGuard)
  @Get()
  @ApiOperation({ summary: "Barcha tolovlarni olish" })
  @ApiResponse({ status: 200, description: "Tolovlar royxati qaytarildi" })
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(AuthGuard,SelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta tolovni olish" })
  @ApiResponse({ status: 200, description: "Tolov topildi" })
  @ApiResponse({ status: 404, description: "Tolov topilmadi" })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @UseGuards(AuthGuard,SelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Tolovni yangilash" })
  @ApiResponse({ status: 200, description: "Tolov muvaffaqiyatli yangilandi" })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @UseGuards(AuthGuard,IsAdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Tolovni ochirish" })
  @ApiResponse({ status: 200, description: "Tolov muvaffaqiyatli ochirildi" })
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
