import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('home')
  root(){
    return {message: 'This is home page from root'}
  }

  @Get('facilities')
  @Render('facilities')
  facilities(){
    return {message: 'This is facilities page'}
  }

  @Get('rooms')
  @Render('rooms')
  rooms(){
    return {message: 'This is rooms page'}
  }

  @Get('contact')
  @Render('contact')
  contact(){
    return {message: 'This is contact page'}
  }

  @Get('reservation')
  @Render('reservation')
  reservation(){
    return {message: 'This is reservation page'}
  }

  @Get('general-terms')
  @Render('general-terms')
  generalTerms(){
    return {message: 'This is general terms page'}
  }

  @Get('general-regulations')
  @Render('general-regulations')
  generalRegulations(){
    return {message: 'This is general regulations page'}
  }

  @Get('payment-regulations')
  @Render('payment-regulations')
  paymentRegulations(){
    return {message: 'This is payment regulations page'}
  }

  @Get('reservation-regulations')
  @Render('reservation-regulations')
  reservationRegulations(){
    return {message: 'This is reservation regulations page'}
  }
  @Get('login')
  @Render('login')
  Login(){
    return {message: 'This is payment regulations page'}
  }
}
