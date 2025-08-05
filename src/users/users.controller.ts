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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";
import { SelfGuard } from "src/common/guards/self.guard";

@ApiTags("Foydalanuvchilar") // Swagger guruh nomi
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi foydalanuvchini qoshish" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "Foydalanuvchi yaratildi" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get()
  @ApiOperation({ summary: "Barcha foydalanuvchilar royxatini olish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchilar royxati" })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID boyicha foydalanuvchini topish" })
  @ApiParam({ name: "id", description: "Foydalanuvchi ID raqami" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi topildi" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Foydalanuvchini tahrirlash" })
  @ApiParam({ name: "id", description: "Foydalanuvchi ID raqami" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli yangilandi",
  })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Foydalanuvchini ochirish" })
  @ApiParam({ name: "id", description: "Foydalanuvchi ID raqami" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi ochirildi" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Delete("all/delete")
  @ApiOperation({ summary: "Barcha foydalanuvchilarni ochirish" })
  @ApiResponse({
    status: 200,
    description: "Barcha foydalanuvchilar ochirildi",
  })
  removeAll() {
    return this.usersService.removeAll();
  }
}
