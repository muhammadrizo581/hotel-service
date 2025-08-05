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
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsCreatorGuard } from "src/common/guards/is-creator.guard";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";

@ApiTags("Adminlar")
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @UseGuards(AuthGuard, IsCreatorGuard)
  @Post()
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiBody({
    type: CreateAdminDto,
    description: "Admin yaratish uchun malumotlar",
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @UseGuards(AuthGuard, IsCreatorGuard)
  @Get()
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  findAll() {
    return this.adminsService.findAll();
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID boyicha bitta adminni olish" })
  @ApiParam({ name: "id", type: Number, description: "Adminning ID raqami" })
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);

  }
  @Post("email/:email")
  @UseGuards(AuthGuard, IsCreatorGuard)
  @ApiOperation({ summary: "Email orqali adminni topish" })
  @ApiParam({ name: "email", type: String, description: "Admin email manzili" })
  findByEmail(@Body("email") email: string) {
    return this.adminsService.findByEmail(email);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, IsCreatorGuard)
  @ApiOperation({ summary: "Admin malumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Admin ID raqami" })
  @ApiBody({ type: UpdateAdminDto, description: "Yangilash uchun malumotlar" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Adminni ochirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Ochiriladigan admin ID raqami",
  })
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }
}
