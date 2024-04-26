// chat.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Message } from '@prisma/client';
import { FuncService } from 'src/func/func.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService, private readonly funcService: FuncService) {}
  
  
  async createMessage(req: Request, userId: number, content: string): Promise<Message> {
    try {
      const { username } = await this.funcService.getUsernameFromJwt_Req(req);      
      if (!username) {
        throw new BadRequestException('Please log in before chatting');
      }
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });
      const createdDate = new Date(); // Tạo đối tượng Date với múi giờ mặc định (UTC)
      const localDate = new Date(createdDate.getTime() + (7 * 60 * 60 * 1000)); // Chuyển đổi sang GMT+7
      return await this.prisma.message.create({
        data: {
          user_id: user.id, // Sử dụng user_id từ dữ liệu tin nhắn
          content: content,
          timestamp: localDate,
        },
      });
    } catch (error) {
      throw new Error(`Error sending message: ${error.message}`);
    }
  }

  async sendMessage(req: Request, messageData: any): Promise<any> {
    try {
      const { userId, content } = messageData; // Trích xuất userId và content từ dữ liệu tin nhắn
      const createdMessage = await this.createMessage(req, userId, content); // Gọi phương thức createMessage với userId và content

      return createdMessage; // Trả về tin nhắn đã được tạo thành công
    } catch (error) {
      throw new Error(`Error sending message: ${error.message}`);
    }
  }

  async getChatHistory(req: Request): Promise<Message[]> {
    try {
      const { username } = await this.funcService.getUsernameFromJwt_Req(req);      
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });
      // Đọc lịch sử tin nhắn từ cơ sở dữ liệu sử dụng Prisma
      return await this.prisma.message.findMany({
        where: {
          user_id: user.id,
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch chat history: ${error.message}`);
    }
  }
}
