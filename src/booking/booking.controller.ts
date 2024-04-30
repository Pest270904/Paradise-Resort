import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor( private readonly bookingService : BookingService) {}

    @Post()
    async getBooking(@Body() data : any, @Res() res : Response) {
        await this.bookingService.createReservation(data, res)
    }
}