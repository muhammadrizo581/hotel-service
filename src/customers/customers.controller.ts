import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";
import { SelfGuard } from "src/common/guards/self.guard";
import { Request } from "express";

@ApiTags("Mijozlar")
@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi mijoz yaratish" })
  create(@Body() createCustomerDto: CreateCustomerDto, @Req() req: Request) {
    return this.customersService.create(createCustomerDto, req);
  }

  @UseGuards(AuthGuard, IsAdminGuard)
  @Get()
  @ApiOperation({ summary: "Barcha mijozlarni olish" })
  findAll() {
    return this.customersService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Mijozni ID orqali olish" })
  findOne(@Param("id") id: string) {
    return this.customersService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Mijoz malumotlarini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Mijozni ochirish" })
  remove(@Param("id") id: string) {
    return this.customersService.remove(+id);
  }
}
