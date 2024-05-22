import { Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { FuncService } from 'src/func/func.service'; // Giả sử đường dẫn đúng

@Injectable()
export class ReviewService {
  constructor(
    private prisma: PrismaService,
    private funcService: FuncService // Thêm FuncService vào constructor
  ) {}

  // Trong review.service.ts
  // Trong review.service.ts
async createReview(req: Request, opinion: string, rating: number) {
  // Lấy thông tin người dùng từ JWT bằng hàm getUserFromUsername
  const userResult = await this.funcService.getUserFromUsername(req); 
  // Kiểm tra xem có lấy được thông tin người dùng không và người dùng có id không
  if (!userResult || !userResult.user || !userResult.user.id) {
    throw new Error('User is not authenticated or not found');
  }
  const createdDate = new Date();
  const localDate = new Date(createdDate.getTime() + (7 * 60 * 60 * 1000));
  // Tạo một đánh giá mới với userId
  return this.prisma.review.create({
    data: {
      userIdName: userResult.user.username, // Sử dụng id của người dùng
      opinion,
      rating,
      createdAt: localDate,
    },
  });
}
async getAllReviews() {
  return this.prisma.review.findMany({
    // include: {
    //   user: true,
    // },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

}
