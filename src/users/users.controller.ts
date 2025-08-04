import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@ApiTags("Foydalanuvchilar") // Swagger guruh nomi
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Yangi foydalanuvchini qo‘shish" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "Foydalanuvchi yaratildi" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha foydalanuvchilar ro‘yxatini olish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchilar ro‘yxati" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha foydalanuvchini topish" })
  @ApiParam({ name: "id", description: "Foydalanuvchi ID raqami" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi topildi" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

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

  @Delete(":id")
  @ApiOperation({ summary: "Foydalanuvchini o‘chirish" })
  @ApiParam({ name: "id", description: "Foydalanuvchi ID raqami" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Delete("all/delete")
  @ApiOperation({ summary: "Barcha foydalanuvchilarni o‘chirish" })
  @ApiResponse({ status: 200, description: "Barcha foydalanuvchilar o‘chirildi" })
  removeAll() {
    return this.usersService.removeAll();
  }
}
