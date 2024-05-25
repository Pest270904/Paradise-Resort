import { Body, Controller, Post,Get, Req, Render } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Request } from 'express';
import { FuncService } from 'src/func/func.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly funcService: FuncService
  ) {}
  
  @Get()
  @Render('review')
  review(@Req() req: Request) {
    return {
      ...this.funcService.getUsernameFromJwt_Req(req),
      css: ['review']
    }
  }

  @Get('getAll')
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
