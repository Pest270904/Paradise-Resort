import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message } from '@prisma/client';
import { FuncService } from 'src/func/func.service';
import { Request } from 'express';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService, private readonly funcService: FuncService) {}
  
  
  async createMessage(req: Request, content: string): Promise<Message> {
    try {
      const { username } = this.funcService.getUsernameFromJwt_Req(req);      
      if (!username) {
        throw new BadRequestException('Please log in before chatting');
      }
      const sender = await this.prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });
      const receiver = await this.prisma.user.findUnique({
        where: {
          id: 1,
        },
        select: {
          id: true,
        },
      });
      if (!receiver) {
        throw new BadRequestException('Recipient receiver Id not found.');
      }
      const createdDate = new Date();
      const localDate = new Date(createdDate.getTime() + (7 * 60 * 60 * 1000));
      return await this.prisma.message.create({
        data: {
          sender_id: sender.id,
          receiver_id: receiver.id,
          content: content,
          timestamp: localDate,
        },
      });
    } catch (error) {
      throw new Error(`Error sending message: ${error.message}`);
    }
  }

  async sendMessage(req: Request, messageData: any): Promise<Message> {
    try {
      const { content } = messageData; 
      const createdMessage = await this.createMessage(req, content);

      return createdMessage; 
    } catch (error) {
      throw new Error(`Error sending message: ${error.message}`);
    }
  }
  async getUsername(req: Request){
    try {
      return this.funcService.getUsernameFromJwt_Req(req);
    } catch (error) {
      throw new Error('Error sending message: Please log in before chatting');
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
      return await this.prisma.message.findMany({
        where: {
          OR: [
            { sender_id: user.id },
            { receiver_id: user.id },
          ],
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch chat history: ${error.message}`);
    }
  }
  
  
}
