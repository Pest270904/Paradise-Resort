import { Get, Controller, Render, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { FuncService } from './func/func.service';

@Controller()
export class AppController {
  constructor(private funcService: FuncService) {}

  @Get('/')
  @Render('home')
  root(@Req() req: Request, @Res() res: Response) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('facilities')
  @Render('facilities')
  facilities(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('rooms')
  @Render('rooms')
  rooms(@Req() req: Request) {
    return this.funcService.getUsernameFromJwt_Req(req);
  }

  @Get('contact')
  @Render('contact')
  contact(@Req() req: Request) {
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
  @Get('payment')
  Payment(@Res() res: Response) {
    return res.render('payment', {
      layout: 'login-layout',
      message: 'Hello world!!',
    });
  }
  @Get('return')
  ReturnCheckout(@Res() res: Response) {
    return res.render('return', {
      layout: 'login-layout',
      message: 'Hello world!!',
    });
  }
}
