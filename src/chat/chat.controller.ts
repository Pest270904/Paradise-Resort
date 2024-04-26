import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { Message } from '@prisma/client';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  
  @Get('history')
  async getChatHistory(): Promise<Message[]> {
    return await this.chatService.getChatHistory();
  }

  @Post('chat')
  async sendMessage(@Req() req: Request, @Body() messageData: any) {
    await this.chatService.sendMessage(req, messageData);
    return { success: true, message: 'Message sent successfully' };
  }
}
