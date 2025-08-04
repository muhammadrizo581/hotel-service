import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MinibarService } from "./minibar.service";
import { CreateMinibarDto } from "./dto/create-minibar.dto";
import { UpdateMinibarDto } from "./dto/update-minibar.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Mini-bar")
@Controller("minibar")
export class MinibarController {
  constructor(private readonly minibarService: MinibarService) {}

  @Post()
  @ApiOperation({ summary: "Yangi minibar mahsulotini qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Mahsulot muvaffaqiyatli qo‘shildi",
  })
  create(@Body() createMinibarDto: CreateMinibarDto) {
    return this.minibarService.create(createMinibarDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha minibar mahsulotlarini olish" })
  @ApiResponse({ status: 200, description: "Mahsulotlar ro‘yxati qaytarildi" })
  findAll() {
    return this.minibarService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Mini-bar mahsulotini ID bo‘yicha olish" })
  @ApiResponse({ status: 200, description: "Mahsulot topildi" })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi" })
  findOne(@Param("id") id: string) {
    return this.minibarService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mini-bar mahsulotini yangilash" })
  @ApiResponse({ status: 200, description: "Mahsulot yangilandi" })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi" })
  update(@Param("id") id: string, @Body() updateMinibarDto: UpdateMinibarDto) {
    return this.minibarService.update(+id, updateMinibarDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Mini-bar mahsulotini o‘chirish" })
  @ApiResponse({ status: 200, description: "Mahsulot o‘chirildi" })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi" })
  remove(@Param("id") id: string) {
    return this.minibarService.remove(+id);
  }
}
