import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { FuncService } from 'src/func/func.service';

@Module({
  providers: [ReservationService, FuncService],
  controllers: [ReservationController],
})
export class ReservationModule {}
