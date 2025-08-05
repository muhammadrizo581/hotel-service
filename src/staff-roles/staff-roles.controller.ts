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
import { StaffRolesService } from "./staff-roles.service";
import { CreateStaffRoleDto } from "./dto/create-staff-role.dto";
import { UpdateStaffRoleDto } from "./dto/update-staff-role.dto";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("Xodim rollari")
@Controller("staff-roles")
export class StaffRolesController {
  constructor(private readonly staffRolesService: StaffRolesService) {}

  @UseGuards(AuthGuard, IsAdminGuard)
  @Post()
  @ApiOperation({ summary: "Yangi xodim roli qoshish" })
  @ApiResponse({ status: 201, description: "Roli muvaffaqiyatli yaratildi" })
  create(@Body() createStaffRoleDto: CreateStaffRoleDto) {
    return this.staffRolesService.create(createStaffRoleDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get()
  @ApiOperation({ summary: "Barcha xodim rollarini olish" })
  @ApiResponse({ status: 200, description: "Barcha rollar royxati" })
  findAll() {
    return this.staffRolesService.findAll();
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID boyicha roli olish" })
  @ApiResponse({ status: 200, description: "Topilgan roli" })
  findOne(@Param("id") id: string) {
    return this.staffRolesService.findOne(+id);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Rolni yangilash" })
  @ApiResponse({ status: 200, description: "Rol muvaffaqiyatli yangilandi" })
  update(
    @Param("id") id: string,
    @Body() updateStaffRoleDto: UpdateStaffRoleDto
  ) {
    return this.staffRolesService.update(+id, updateStaffRoleDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Rolni ochirish" })
  @ApiResponse({ status: 200, description: "Rol muvaffaqiyatli ochirildi" })
  remove(@Param("id") id: string) {
    return this.staffRolesService.remove(+id);
  }
}
