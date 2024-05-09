import {Module, Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import { FuncService } from 'src/func/func.service';
@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
  ) {}

  // @Get('checkout')
  // async getCheckoutUrl(@Res() res: Response) {
  //   const url = await this.paymentService.VNPayCheckoutUrl();
  //   // Trả về URL redirect hoặc thực hiện redirect tại đây
  //   return res.redirect(url);
  // }
  //
  @Post('checkout')
  async payment(@Body() data: any, @Res() res: Response) {
    const url = await this.paymentService.VNPayCheckoutUrl(
      data.res_id,
      data.cost,
    );
    // Trả về URL redirect hoặc thực hiện redirect tại đây
    console.log(url);
    return res.json({ url: url });
  }
  @Get('return')
  async handlerReturn(@Req() req, @Res() res: Response) {
    const resId = req.query.res_id;
    const result = await this.paymentService.VNPayReturn(req);
    // Render ra trang thông báo kết quả dựa vào result
    if (result.code === '00') {
      //await this.reservationService.successReservation(resId);
    }
  }
}
