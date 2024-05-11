import { Body, Controller, Post,Get, Req, Render } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Request } from 'express';
import { Prisma } from '@prisma/client';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  
  @Get()
  async getAllReviews() {
    return this.reviewService.getAllReviews();
  }

  @Post()
  async createReview(
    @Req() req: Request,
    @Body('opinion') opinion: string,
    @Body('rating') rating: number,
  ) {
    return this.reviewService.createReview(req, opinion, rating);
  }

}
