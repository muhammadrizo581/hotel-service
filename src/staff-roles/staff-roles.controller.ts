import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { StaffRolesService } from "./staff-roles.service";
import { CreateStaffRoleDto } from "./dto/create-staff-role.dto";
import { UpdateStaffRoleDto } from "./dto/update-staff-role.dto";

@ApiTags("Xodim rollari")
@Controller("staff-roles")
export class StaffRolesController {
  constructor(private readonly staffRolesService: StaffRolesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xodim roli qo‘shish" })
  @ApiResponse({ status: 201, description: "Roli muvaffaqiyatli yaratildi" })
  create(@Body() createStaffRoleDto: CreateStaffRoleDto) {
    return this.staffRolesService.create(createStaffRoleDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xodim rollarini olish" })
  @ApiResponse({ status: 200, description: "Barcha rollar ro‘yxati" })
  findAll() {
    return this.staffRolesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha roli olish" })
  @ApiResponse({ status: 200, description: "Topilgan roli" })
  findOne(@Param("id") id: string) {
    return this.staffRolesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Rolni yangilash" })
  @ApiResponse({ status: 200, description: "Rol muvaffaqiyatli yangilandi" })
  update(
    @Param("id") id: string,
    @Body() updateStaffRoleDto: UpdateStaffRoleDto
  ) {
    return this.staffRolesService.update(+id, updateStaffRoleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Rolni o‘chirish" })
  @ApiResponse({ status: 200, description: "Rol muvaffaqiyatli o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.staffRolesService.remove(+id);
  }
}
