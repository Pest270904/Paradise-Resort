import { Get, Controller, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { FuncService } from './func/func.service';

@Controller()
export class AppController {
  constructor(private funcService: FuncService) {}

  @Get()
  @Render('home')
  root(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('facilities')
  @Render('facilities')
  facilities(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('general-terms')
  @Render('general-terms')
  generalTerms(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('general-regulations')
  @Render('general-regulations')
  generalRegulations(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('payment-regulations')
  @Render('payment-regulations')
  paymentRegulations(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('reservation-regulations')
  @Render('reservation-regulations')
  reservationRegulations(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }
}
