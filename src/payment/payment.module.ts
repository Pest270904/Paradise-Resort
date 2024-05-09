import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  controllers: [PaymentController], // Chỉ inject PaymentController
  providers: [PaymentService], // Inject cả PaymentService và ReservationService
  exports: [PaymentService],
})
export class PaymentModule {}
