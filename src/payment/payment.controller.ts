  import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
  import { Response } from 'express';
  import { PaymentService } from './payment.service';
  import { ReservationService } from 'src/reservation/reservation.service';
  @Controller('payment')
  export class PaymentController {
    constructor(
      private paymentService: PaymentService,
      private reservationService: ReservationService
    ) {}

    @Get()
    Payment(@Res() res: Response) {
      return res.render('payment', {
        layout: false,
        message: 'Hello world!!',
      });
    }

    //Dung de chinh sua giao dien return, ko lam gi thi tat di
    @Get('vnpay_failure')
    ReturnCheckout(@Res() res: Response) {
      return res.render('vnpay_failure', {
        layout: false,
        message: 'Hello world!!',
      });
    }
    
    // Dung de chinh sua giao dien success, ko lam gi thi tat di
    @Get('vnpay_success')
    GetSuccess(@Res() res: Response) {
      return res.render('vnpay_success', {
        layout: false,
        message: 'Hello world!!',
      });
    }

    @Post('checkout')
    async payment(@Body() data: any, @Res() res: Response) {
      const url = await this.paymentService.VNPayCheckoutUrl(
        data.res_id,
        data.cost)
      return res.json({ url: url.vnpUrl });
    }
    @Get('vnpay_return')
    async handlerReturn(@Req() req, @Res() res: Response) {
      const result = await this.paymentService.VNPayReturn(req, res);
      // thay đổi thông báo kết quả dựa vào result
      console.log('ket qua cua vnpay return',result);
      if (result.responseObject.rspCode == '00') {
        this.reservationService.success(result.responseObject.resId);
        return res.render('vnpay_success', {
          layout: false,
          message: 'Payment Successful',
        });
      } else {
        // Thanh toán thất bại
        return res.render('vnpay_failure', {
          layout: false,
          message: 'Payment failed. Please try again.',
        });
      }
  }
    @Post('vnpay_ipn')
    handleVNPayIPN(@Body() vnpParams: any) {
    return this.paymentService.handleVNPayIPN(vnpParams);
  }
}
