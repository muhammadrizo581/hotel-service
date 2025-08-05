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
import { StaffsService } from "./staffs.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";
import { SelfGuard } from "src/common/guards/self.guard";

@ApiTags("Xodimlar") // Swagger gruppa nomi
@Controller("staffs")
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @UseGuards()
  @Post()
  @ApiOperation({ summary: "Yangi xodim qoshish" })
  @ApiResponse({ status: 201, description: "Xodim muvaffaqiyatli yaratildi" })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get()
  @ApiOperation({ summary: "Barcha xodimlarni korish" })
  @ApiResponse({ status: 200, description: "Xodimlar royxati" })
  findAll() {
    return this.staffsService.findAll();
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID boyicha bitta xodimni korish" })
  @ApiResponse({ status: 200, description: "Topilgan xodim ma’lumoti" })
  findOne(@Param("id") id: string) {
    return this.staffsService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Xodim ma’lumotini yangilash" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli yangilandi" })
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Xodimni ochirish" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli ochirildi" })
  remove(@Param("id") id: string) {
    return this.staffsService.remove(+id);
  }
}
