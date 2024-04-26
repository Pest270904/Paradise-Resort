// chat.service.ts
import { Injectable } from '@nestjs/common';
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
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });
      return await this.prisma.message.create({
        data: {
          user_id: user.id, // Sử dụng user_id từ dữ liệu tin nhắn
          content: content,
          timestamp: new Date(),
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
}
