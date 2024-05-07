import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common'; 
import { AdminService } from './admin.service';
import { FuncService } from 'src/func/func.service';
import { Response, Request } from 'express'
import { Message } from '@prisma/client';
import { CheckTokenMiddleware } from 'src/middleware/checkToken.middleware';
import { AdminGuard } from './admin.guard';
@Controller('admin')
export class AdminController {
    constructor (
        private adminService : AdminService,
        private funcService : FuncService
    ) {}
    @Get()
    @UseGuards(AdminGuard)
    admin(@Req() req: Request, @Res() res: Response) {
    res.render('admin', {
      layout: 'admin-layout'
    })
    return this.funcService.getUsernameFromJwt_Req(req)
  }

    

    @Get('admin-chat')
    async adminChatPage(@Req() req: Request, @Res() res: Response) {
    try {
    const chatList = await this.adminService.getChatList();
    res.render('admin-chat', {
      layout: 'admin-layout',
      chatList: JSON.stringify(chatList) // Truyền dữ liệu chatlist dưới dạng JSON string để sử dụng trong script của trang HTML
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load chat list' });
  }
} 
  @Get('/admin-chat/:username')
  async getChatHistory(@Param('username') username: string): Promise<Message[]> {
      return await this.adminService.getChatHistoryByUsername(username);
  }
  @Post('/admin-message/:username')
  async sendMessage(@Param('username') username: string ,@Req() req: Request, @Body() messageData: any) {
    await this.adminService.sendMessage(req, messageData, username);
  }
}