import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  // --------------------------------- SignUp ---------------------------------
  @Get('signup')
  userRegister(@Req() req : Request, @Res() res: Response) {
    this.authService.getSignup(req, res)
  }

  @Post('signup')
  createUser(@Req() req: Request, @Res() res: Response) {
    this.authService.signUp(req.body, res) // req.body = userData
  }

  // --------------------------------- Login ---------------------------------
  @Get('login')
  userLogin(@Req() req : Request, @Res() res: Response) {
    this.authService.getLogin(req, res)
  }

  @Post('login')
  userSignIn(@Req() req : Request, @Res() res: Response) {
    this.authService.signIn(req.body, res)  // req.body = userData
  }

  // --------------------------------- Logout ---------------------------------
  @Get('logout')
  userLogout(@Res() res: Response) {
    this.authService.logOut(res)
  }
}