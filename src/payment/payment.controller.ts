  import {Module, Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { PaymentService } from './payment.service';
  import { FuncService } from 'src/func/func.service';
  import { ReservationService } from 'src/reservation/reservation.service';
  @Controller('payment')
  export class PaymentController {
    constructor(
      private paymentService: PaymentService,
      private reservationService: ReservationService
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
      this.reservationService.success(data.res_id);
      // Trả về URL redirect hoặc thực hiện redirect tại đây
      console.log(url.vnpUrl);
      return res.json({ url: url.vnpUrl });
    }
    @Get('return')
    async handlerReturn(@Body() data: any,@Req() req, @Res() res: Response) {
      const result = await this.paymentService.VNPayReturn(data.res_id, req);
      // thay đổi thông báo kết quả dựa vào result
      if (result.code=="00"){
        this.reservationService.success(data.res_id);
      }
      // Trả về thông báo kết quả
      res.json({ result });
    }
    @Post('vnpay_ipn')
    handleVNPayIPN(@Body() vnpParams: any) {
    return this.paymentService.handleVNPayIPN(vnpParams);
  }
  }
