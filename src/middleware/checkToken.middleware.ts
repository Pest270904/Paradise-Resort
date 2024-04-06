import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {

  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;
    if (token !== undefined) {
      try {
        const decodedToken = this.jwtService.decode(token);
        if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
          // Token has expired
          res.clearCookie('jwt').redirect('/auth/login') 
          throw new UnauthorizedException('Token has expired');
        }
        next();
      } catch (error) {
        // Token verification failed
        throw new UnauthorizedException('Invalid token');
      }
    }
    else {
      next()
    }
  }
}