import { Controller, Post, Body, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request } from 'express';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  
  @Post('chat')
  async sendMessage(@Req() req: Request, @Body() messageData: any) {
    await this.chatService.sendMessage(req, messageData);
    return { success: true, message: 'Message sent successfully' };
  }
}
