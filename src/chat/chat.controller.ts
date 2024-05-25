import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { Message } from '@prisma/client'; 

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  
  @Get('history')
  async getChatHistory(@Req() req: Request): Promise<Message[]> {
    return await this.chatService.getChatHistory(req);
  }

  @Get('username-chat')
  async getUsername(@Req() req: Request) {
    return await this.chatService.getUsername(req);
  }
  
  @Post('message')
  async sendMessage(@Req() req: Request, @Body() messageData: any) {
    await this.chatService.sendMessage(req, messageData); 
  }
}

