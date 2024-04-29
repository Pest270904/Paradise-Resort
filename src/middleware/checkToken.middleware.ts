import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {

  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;
    if (token !== undefined) {
        const decodedToken = this.jwtService.decode(token);
        if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
          // Token has expired
          res.clearCookie('jwt').redirect('/auth/login')  
          
          console.log(`\n${decodedToken.username}'s token has expired at ` + new Date().toLocaleString())

          throw new UnauthorizedException('Token has expired'); 
        }
        next();
    }
    else {
      next()
    }
  }
}