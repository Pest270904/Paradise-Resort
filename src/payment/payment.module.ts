import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ReservationService } from 'src/reservation/reservation.service';
import { FuncService } from 'src/func/func.service';

@Module({
  controllers: [PaymentController], 
  providers: [PaymentService, ReservationService, FuncService],
  exports: [PaymentService],
})
export class PaymentModule {}
