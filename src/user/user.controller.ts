import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/user_login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
  userSignIn(@Body() userData : LoginUserDto, @Res() res: Response) {
      return this.userService.signIn(userData, res)
  }

  @Get(':id')
  renderId(@Res() res: Response, @Param() id){
    res.render('home')
  }
}
