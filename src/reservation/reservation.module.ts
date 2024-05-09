import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { FuncService } from 'src/func/func.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ReservationService, FuncService, JwtService],
  controllers: [ReservationController],
})
export class ReservationModule {}
