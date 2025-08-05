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
import { MinibarService } from "./minibar.service";
import { CreateMinibarDto } from "./dto/create-minibar.dto";
import { UpdateMinibarDto } from "./dto/update-minibar.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { IsReceptionistGuard } from "src/common/guards/is-receptionist.guard";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("Mini-bar")
@Controller("minibar")
export class MinibarController {
  constructor(private readonly minibarService: MinibarService) {}

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Post()
  @ApiOperation({ summary: "Yangi minibar mahsulotini qoshish" })
  @ApiResponse({
    status: 201,
    description: "Mahsulot muvaffaqiyatli qoshildi",
  })
  create(@Body() createMinibarDto: CreateMinibarDto) {
    return this.minibarService.create(createMinibarDto);
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Get()
  @ApiOperation({ summary: "Barcha minibar mahsulotlarini olish" })
  @ApiResponse({ status: 200, description: "Mahsulotlar royxati qaytarildi" })
  findAll() {
    return this.minibarService.findAll();
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Get(":id")
  @ApiOperation({ summary: "Mini-bar mahsulotini ID boyicha olish" })
  @ApiResponse({ status: 200, description: "Mahsulot topildi" })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi" })
  findOne(@Param("id") id: string) {
    return this.minibarService.findOne(+id);
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Mini-bar mahsulotini yangilash" })
  @ApiResponse({ status: 200, description: "Mahsulot yangilandi" })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi" })
  update(@Param("id") id: string, @Body() updateMinibarDto: UpdateMinibarDto) {
    return this.minibarService.update(+id, updateMinibarDto);
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Mini-bar mahsulotini ochirish" })
  @ApiResponse({ status: 200, description: "Mahsulot ochirildi" })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi" })
  remove(@Param("id") id: string) {
    return this.minibarService.remove(+id);
  }
}
