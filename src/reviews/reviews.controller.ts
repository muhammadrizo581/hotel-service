import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags("Sharhlar")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi sharh yaratish" })
  @ApiBody({ type: CreateReviewDto })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha sharhlarni ko‘rish" })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Sharhni ID orqali ko‘rish" })
  @ApiParam({ name: "id", type: String, description: "Sharh ID raqami" })
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Sharhni yangilash" })
  @ApiParam({ name: "id", type: String, description: "Sharh ID raqami" })
  @ApiBody({ type: UpdateReviewDto })
  update(@Param("id") id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Sharhni o‘chirish" })
  @ApiParam({ name: "id", type: String, description: "Sharh ID raqami" })
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(+id);
  }
}
