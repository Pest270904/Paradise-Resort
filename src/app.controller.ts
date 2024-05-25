import { Get, Controller, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { FuncService } from './func/func.service';

@Controller()
export class AppController {
  constructor(private funcService: FuncService) {}

  @Get()
  @Render('home')
  root(@Req() req: Request) {
    return {
      ...this.funcService.getUsernameFromJwt_Req(req),
      css: ['home']
    };
  }

  @Get('facilities')
  @Render('facilities')
  facilities(@Req() req: Request) {
    return {
      ...this.funcService.getUsernameFromJwt_Req(req),
      css: ['faci']
    }
  }

  @Get('general-terms')
  @Render('general-terms')
  generalTerms(@Req() req: Request) {
    return {
      ...this.funcService.getUsernameFromJwt_Req(req),
    css: ['terms']
    }
  }

  @Get('general-regulations')
  @Render('general-regulations')
  generalRegulations(@Req() req: Request) {
    return {
      ...this.funcService.getUsernameFromJwt_Req(req),
      css: ['terms']
    }
  }

  @Get('payment-regulations')
  @Render('payment-regulations')
  paymentRegulations(@Req() req: Request) {
    return {
      ...this.funcService.getUsernameFromJwt_Req(req),
      css: ['terms']
    }
  }

  @Get('reservation-regulations')
  @Render('reservation-regulations')
  reservationRegulations(@Req() req: Request) {
    return {
      ...this.funcService.getUsernameFromJwt_Req(req),
      css: ['terms']
    }
  }
}
