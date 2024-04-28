import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Message } from '@prisma/client';
import { AdminchatService } from './adminchat.service';
import { Response, Request } from 'express' 
@Controller('admin')
export class AdminchatController {
    constructor(private readonly adminchatService: AdminchatService) {}
  
  @Get('history')
  async getChatHistory(@Req() req: Request): Promise<Message[]> {
    return await this.adminchatService.getChatHistory(req);
  }

  @Post('admin-chat')
  async sendMessage(@Req() req: Request, @Body() messageData: any) {
    await this.adminchatService.sendMessage(req, messageData);
    return { success: true, message: 'Message sent successfully' };
  }
}
