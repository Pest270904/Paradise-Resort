import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('checkout')
  async redirectToCheckout(@Res() res: Response) {
    try {
      const amount = 50000; // Ví dụ: Số tiền thanh toán là 50000 VNĐ
      const bankCode = 'VNBANK'; // Ví dụ: Mã ngân hàng nếu có
      const orderDescription = 'Thanh toán đơn hàng'; // Ví dụ: Mô tả đơn hàng
      const orderType = 'other'; // Ví dụ: Loại đơn hàng
      const language = 'vn'; // Ví dụ: Ngôn ngữ là tiếng Việt

      const checkoutUrl = await this.paymentService.createPaymentUrl(
        amount,
        bankCode,
        orderDescription,
        orderType,
        language,
      );
      return res.redirect(checkoutUrl);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Error occurred while creating payment URL' });
    }
  }
}
