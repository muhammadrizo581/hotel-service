import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StaffsService } from "./staffs.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Xodimlar") // Swagger gruppa nomi
@Controller("staffs")
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xodim qo‘shish" })
  @ApiResponse({ status: 201, description: "Xodim muvaffaqiyatli yaratildi" })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xodimlarni ko‘rish" })
  @ApiResponse({ status: 200, description: "Xodimlar ro‘yxati" })
  findAll() {
    return this.staffsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta xodimni ko‘rish" })
  @ApiResponse({ status: 200, description: "Topilgan xodim ma’lumoti" })
  findOne(@Param("id") id: string) {
    return this.staffsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xodim ma’lumotini yangilash" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli yangilandi" })
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xodimni o‘chirish" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.staffsService.remove(+id);
  }
}
