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
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { IsReceptionistGuard } from "src/common/guards/is-receptionist.guard";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("Xizmatlar")
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Post()
  @ApiOperation({ summary: "Yangi xizmat qoshish" })
  @ApiResponse({ status: 201, description: "Xizmat muvaffaqiyatli yaratildi" })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Get()
  @ApiOperation({ summary: "Barcha xizmatlarni olish" })
  @ApiResponse({ status: 200, description: "Xizmatlar royxati" })
  findAll() {
    return this.servicesService.findAll();
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Get(":id")
  @ApiOperation({ summary: "Xizmatni ID boyicha olish" })
  @ApiResponse({ status: 200, description: "Topilgan xizmat" })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Xizmatni yangilash" })
  @ApiResponse({ status: 200, description: "Xizmat yangilandi" })
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @UseGuards(AuthGuard, IsReceptionistGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Xizmatni ochirish" })
  @ApiResponse({ status: 200, description: "Xizmat ochirildi" })
  remove(@Param("id") id: string) {
    return this.servicesService.remove(+id);
  }
}
