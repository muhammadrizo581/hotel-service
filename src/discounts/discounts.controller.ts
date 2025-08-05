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
import { DiscountsService } from "./discounts.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";

@ApiTags("Chegirmalar")
@Controller("discounts")
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @UseGuards(AuthGuard, IsAdminGuard)
  @Post()
  @ApiOperation({ summary: "Yangi chegirma yaratish" })
  @ApiResponse({
    status: 201,
    description: "Chegirma muvaffaqiyatli yaratildi",
  })
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountsService.create(createDiscountDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get()
  @ApiOperation({ summary: "Barcha chegirmalarni olish" })
  @ApiResponse({ status: 200, description: "Chegirmalar ro'yxati" })
  findAll() {
    return this.discountsService.findAll();
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID orqali chegirmalarni olish" })
  @ApiResponse({ status: 200, description: "Tanlangan chegirma ma'lumotlari" })
  findOne(@Param("id") id: string) {
    return this.discountsService.findOne(+id);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Chegirmani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Chegirma muvaffaqiyatli yangilandi",
  })
  update(
    @Param("id") id: string,
    @Body() updateDiscountDto: UpdateDiscountDto
  ) {
    return this.discountsService.update(+id, updateDiscountDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Chegirmani ochirish" })
  @ApiResponse({ status: 200, description: "Chegirma ochirildi" })
  remove(@Param("id") id: string) {
    return this.discountsService.remove(+id);
  }
}
