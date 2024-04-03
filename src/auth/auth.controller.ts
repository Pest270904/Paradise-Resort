import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user_login.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render('home', {
      message: 'Hello world!!',
    });
  }

  // Register
  @Get('register')
  userRegister(@Res() res: Response) {
    return res.render('register', {
      layout: 'login-layout',
      message: 'Hello world!!',
    });
  }
  @Post('register')
  createUser(@Body() userData : CreateUserDto, @Res() res: Response) {
    return this.userService.signUp(userData, res);
  }

  // Login
  @Get('login')
  userLogin(@Res() res: Response) {
    return res.render('login', {
      layout: 'login-layout',
      message: 'Hello world!!',
    });
  }
  
  @Post('login')
  //userSignIn(@Body() userData : LoginUserDto, @Req() req: Request, @Res() res: Response)
  userSignIn(@Body() userData : LoginUserDto, @Req() req: Request) {
      const body = req.body;

      console.log(body)
      //return this.userService.signIn(userData, res)
      return this.userService.signIn(userData)
  }

  @Get(':id')
  renderId(@Res() res: Response, @Param() id){
    res.render('home')
  }
}
