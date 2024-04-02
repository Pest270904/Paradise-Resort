import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get()
  root(@Res() res: Response) {
    return res.render('home', {
      message: 'Hello world!!',
    });
  }

  @Get('login')
  userLogin(@Res() res: Response) {
    return res.render('login', {
      layout: 'login-layout',
      message: 'Hello world!!',
    });
  }

  @Post('login')
  createUser(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    response.send({
      message: 'Account created',
      infomation: request.body,
    });
  }
}
