import { Body, Controller, Get, Post, Render, Req } from '@nestjs/common'
import { Request } from 'express';
import { FuncService } from 'src/func/func.service';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor (
        private readonly funcService: FuncService,
        private readonly reservationService: ReservationService,
    ) {}

    @Get()
    @Render('reservation')
    async reservation(@Req() req: Request) {
      return {...this.funcService.getUsernameFromJwt_Req(req), 
            ...await this.reservationService.getAllReservation(req) 
        }
    }

    @Post('cancel')
    async cancel(@Body() body : any) {
        return await this.reservationService.cancel(body.res_id)
    }
}