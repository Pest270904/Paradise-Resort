import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('checkout')
  async getCheckoutUrl(@Res() res: Response) {
    const url = await this.paymentService.VNPayCheckoutUrl();
    // Trả về URL redirect hoặc thực hiện redirect tại đây
    return res.redirect(url);
  }

  @Get('return')
  async handlerReturn(@Req() req, @Res() res: Response) {
    const result = await this.paymentService.VNPayReturn(req);
    // Render ra trang thông báo kết quả dựa vào result
    if (result.code === '00') {
      res.render('successpayment', { message: 'Giao dịch thành công' });
    } else if (result.code === '97') {
      res.render('failure', { message: 'Chữ ký không hợp lệ' });
    } else if (result.code === '99') {
      res.render('failure', { message: 'Dữ liệu không hợp lệ' });
    } else {
      res.render('failure', { message: 'Giao dịch thất bại' });
    }
  }
}
