import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user_login.dto';
import { FuncService } from 'src/func/func.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private funcService: FuncService,
  ) {}

  // Register
  @Get('signup')
  userRegister(@Res() res: Response) {
    return res.render('signup', {
      layout: 'login-layout',
      message: 'Hello world!!',
    });
  }

  @Post('signup')
  async createUser(@Body() userData: CreateUserDto, @Res() res: Response) {
    const token = await this.authService.signUp(userData).then((data) => {
      return data;
    });
    res.cookie('jwt', token);

    console.log('Token: ', this.funcService.getTokenFromHeader_Res(res));

    res.redirect(`/`);

    console.log('Register completed!!');
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
  async userSignIn(@Body() userData: LoginUserDto, @Res() res: Response) {
    const token = await this.authService.signIn(userData).then((data) => {
      return data;
    });
    res.cookie('jwt', token);

    res.redirect(`/`);

    console.log('Login completed!!');
  }

  // Logout
  @Get('logout')
  userLogout(@Res() res: Response) {
    res.clearCookie('jwt').redirect('/');
    console.log('Logout completed');
  }
}