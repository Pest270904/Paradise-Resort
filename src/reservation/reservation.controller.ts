import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express';
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
        console.log(await this.reservationService.getAllReservation(req) )
        return {...this.funcService.getUsernameFromJwt_Req(req), 
            ...await this.reservationService.getAllReservation(req) 
        }
    }

    // This route is from booking form's destination (booking.hbs)
    @Post('create')
    async createReservation(@Body() data : any, @Res() res : Response) {
        await this.reservationService.create(data, res)
    }

    @Post('cancel')
    async cancelReservation(@Body() body : any) {
        return await this.reservationService.cancel(body.res_id)
    }
}