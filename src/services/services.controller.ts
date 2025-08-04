import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Xizmatlar")
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xizmat qo‘shish" })
  @ApiResponse({ status: 201, description: "Xizmat muvaffaqiyatli yaratildi" })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xizmatlarni olish" })
  @ApiResponse({ status: 200, description: "Xizmatlar ro‘yxati" })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Xizmatni ID bo‘yicha olish" })
  @ApiResponse({ status: 200, description: "Topilgan xizmat" })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xizmatni yangilash" })
  @ApiResponse({ status: 200, description: "Xizmat yangilandi" })
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xizmatni o‘chirish" })
  @ApiResponse({ status: 200, description: "Xizmat o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.servicesService.remove(+id);
  }
}
