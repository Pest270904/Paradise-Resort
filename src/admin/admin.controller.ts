import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common'; 
import { AdminService } from './admin.service';
import { FuncService } from 'src/func/func.service';
import { Response, Request } from 'express'
import { Message,Reservation,Room,User } from '@prisma/client';
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

  @Get('create')
  async createAdmin() {
    return await this.adminService.createAdmin(); 
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
  @Get('admin-reservation')
  adminReservationPage(@Req() req: Request, @Res() res: Response) {
  res.render('admin-reservation', {
    layout: 'admin-layout'
  })
  return this.funcService.getUsernameFromJwt_Req(req)
}
  @Get('data')
  async getData() {
    const data = await this.adminService.getAllReservations();
    return { data}; 
}
  @Get('admin-home')
  adminHome(@Req() req: Request, @Res() res: Response) {
  res.render('admin-home', {
    layout: 'admin-layout'
  }) 
}
  @Get('dataRoom')
  async getDataRoom() {
    return this.adminService.getAllRoom();
  }
  @Get('admin-users')
  adminUser(@Req() req: Request, @Res() res: Response) {
  res.render('admin-users', {
    layout: 'admin-layout'
  }) 
  }
  @Get('dataUser')
  async getDataUser()
  {
    return this.adminService.getDataUser();
  }

}
