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
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";
import { IsReceptionistGuard } from "src/common/guards/is-receptionist.guard";
import { AuthGuard } from "src/common/guards/auth.guard";
import { IsAdminGuard } from "src/common/guards/is-admin.guard";

@ApiTags("Sharhlar")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard,)
  @Post()
  @ApiOperation({ summary: "Yangi sharh yaratish" })
  @ApiBody({ type: CreateReviewDto })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha sharhlarni korish" })
  findAll() {
    return this.reviewsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Sharhni ID orqali korish" })
  @ApiParam({ name: "id", type: String, description: "Sharh ID raqami" })
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(+id);
  }

  @UseGuards(AuthGuard,IsAdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Sharhni yangilash" })
  @ApiParam({ name: "id", type: String, description: "Sharh ID raqami" })
  @ApiBody({ type: UpdateReviewDto })
  update(@Param("id") id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  
  @UseGuards(AuthGuard,IsAdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Sharhni ochirish" })
  @ApiParam({ name: "id", type: String, description: "Sharh ID raqami" })
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(+id);
  }
}
