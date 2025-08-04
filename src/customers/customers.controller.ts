import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags("Mijozlar")
@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: "Yangi mijoz yaratish" })
  @ApiBody({
    type: CreateCustomerDto,
    description: "Yangi mijoz malumotlari",
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha mijozlarni olish" })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Mijozni ID orqali olish" })
  @ApiParam({ name: "id", type: Number, description: "Mijoz ID raqami" })
  findOne(@Param("id") id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mijoz malumotlarini yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Yangilanadigan mijoz ID raqami",
  })
  @ApiBody({
    type: UpdateCustomerDto,
    description: "Yangilangan mijoz malumotlari",
  })
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Mijozni ochirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Ochiriladigan mijoz ID raqami",
  })
  remove(@Param("id") id: string) {
    return this.customersService.remove(+id);
  }
}
