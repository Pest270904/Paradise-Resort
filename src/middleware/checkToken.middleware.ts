import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;
    if (token !== undefined) {
        const decodedToken = this.jwtService.decode(token);

        const user = this.prismaService.user.findUnique({
          where: {
              username : decodedToken.username
          }
        })

        // check if user in token exists in database
        if (!user) {
          res.cookie('error', 'Invalid user, please login again.')
          res.clearCookie('jwt').redirect('/auth/login')
          throw new UnauthorizedException('Invalid user?')
        }

        // check if token is expired
        if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
          //console.log(`\n${decodedToken.username}'s token has expired at ` + new Date().toLocaleString())
          res.cookie('error', 'Your token has expired, please login again to continue.')
          res.clearCookie('jwt').redirect('/auth/login')   
          throw new UnauthorizedException('Token has expired')
        }
    }

    next()
  }
}