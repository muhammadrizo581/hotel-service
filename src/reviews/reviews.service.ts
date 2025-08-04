import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = await this.prisma.reviews.create({
      data: {
        hotel_id: createReviewDto.hotel_id,
        customer_id: createReviewDto.customer_id,
        rating: createReviewDto.rating,
        description: createReviewDto.description,
        created_at: new Date(),
      },
    });
    return review;
  }

  async findAll() {
    const reviews = await this.prisma.reviews.findMany();
    return reviews;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const review = await this.prisma.reviews.findUnique({ where: { id } });
    if (!review) {
      throw new BadRequestException("Bunday review mavjud emas");
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const review = await this.prisma.reviews.update({
      where: { id },
      data: updateReviewDto,
    });
    return review;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException("Iltimos ID-ni kiriting");
    }
    const review = await this.prisma.reviews.delete({ where: { id } });
    if (!review) {
      throw new BadRequestException("Bunday review mavjud emas");
    }
    return review;
  }
}
