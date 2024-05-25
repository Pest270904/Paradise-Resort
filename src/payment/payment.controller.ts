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
        layout: 'login-layout',
        message: 'Hello world!!',
      });
    }

    @Get('vnpay_return')
    ReturnCheckout(@Res() res: Response) {
      return res.render('vnpay_return', {
        layout: false,
        message: 'Hello world!!',
      });
    }
    
    @Get('vnpay_return/vnpay_failure')
    GetFailure(@Res() res: Response) {
      return res.render('vnpay_failure', {
        layout: false,
        message: 'Hello world!!',
      });
    }
    
    @Get('vnpay_return/vnpay_success')
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
        data.cost,
      );
      return res.json({ url: url.vnpUrl });
    }
    @Get('vnpay_return')
    async handlerReturn(@Req() req, @Res() res: Response) {
      const result = await this.paymentService.VNPayReturn(req, res);
      // thay đổi thông báo kết quả dựa vào result
      // console.log(result);
      if (result.rspCode === '00') {
        this.reservationService.success(result.resId);
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
