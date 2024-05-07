import { Get, Controller, Render, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { FuncService } from './func/func.service';
import { AdminService } from './admin/admin.service';

@Controller()
export class AppController {
  constructor(private adminService : AdminService,private funcService: FuncService) {}

  @Get('/')
  async root(@Req() req: Request, @Res() res: Response) {
    const isAdmin = await this.funcService.isAdmin(req); // Kiểm tra xem người dùng có phải là admin không
    if (isAdmin) {
      // Nếu là admin, chuyển hướng đến trang admin
      //return res.redirect('/admin');
      // khuc nay dang phuc che lai
      const username = await this.funcService.getUsernameFromJwt_Req(req);
      return res.render('home', { username });
    } else {
      // Nếu không phải là admin, render trang home và truyền tên người dùng
      const username = await this.funcService.getUsernameFromJwt_Req(req);
      return res.render('home', { username });
    }
  }
  @Get('/create')
  async createAdmin() {
    console.log('Đã tạo admin');
    return await this.adminService.createAdmin(); 
  }

  @Get('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    // Xóa hoặc hủy token ở đây
    console.log("admin has logged out ");
    res.clearCookie('jwt').redirect('/'); // Xóa cookie chứa token và chuyển hướng đến trang chủ
  }
  
  @Get('facilities')
  @Render('facilities')
  facilities(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('rooms')
  @Render('rooms')
  rooms(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('contact')
  @Render('contact')
  contact(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('general-terms')
  @Render('general-terms')
  generalTerms(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('general-regulations')
  @Render('general-regulations')
  generalRegulations(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('payment-regulations')
  @Render('payment-regulations')
  paymentRegulations(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('reservation-regulations')
  @Render('reservation-regulations')
  reservationRegulations(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }
  @Get('payment')
  Payment(@Res() res: Response) {
    return res.render('payment', {
      layout: 'login-layout',
      message: 'Hello world!!',
    });
  }
  @Get('return')
  ReturnCheckout(@Res() res: Response) {
    return res.render('return', {
      layout: 'login-layout',
      message: 'Hello world!!',
    });
  }
}
