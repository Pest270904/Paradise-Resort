import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { JwtService } from '@nestjs/jwt';
import { ReservationService } from 'src/reservation/reservation.service';

@Module({
  controllers: [PaymentController], 
  providers: [PaymentService,JwtService, ReservationService],
  exports: [PaymentService],
})
export class PaymentModule {}
