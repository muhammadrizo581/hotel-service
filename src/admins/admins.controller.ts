import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags("Adminlar")
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiBody({
    type: CreateAdminDto,
    description: "Admin yaratish uchun malumotlar",
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID boyicha bitta adminni olish" })
  @ApiParam({ name: "id", type: Number, description: "Adminning ID raqami" })
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @Post("email/:email")
  @ApiOperation({ summary: "Email orqali adminni topish" })
  @ApiParam({ name: "email", type: String, description: "Admin email manzili" })
  findByEmail(@Body("email") email: string) {
    return this.adminsService.findByEmail(email);
  }

  @Patch(":id")
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
