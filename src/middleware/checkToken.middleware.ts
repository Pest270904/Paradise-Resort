import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { DecodedToken } from 'src/interface/decodedToken.interface';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly config: ConfigService
  ) {}

use(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;
    if (token !== undefined) {
      try {
        const decoded = jwt.verify( token, this.config.get('JWT_SECRET')) as DecodedToken;
  
        const user = this.prismaService.user.findUnique({
          where: {
              username : decoded.username
          }
        })
  
        // check if user in token exists in database
        if (!user) {
          res.cookie('error', 'Invalid user, please login again.')
          res.clearCookie('jwt').redirect('/auth/login')
          throw new UnauthorizedException('Invalid user?')
        }
      }
      catch (error)
      {
        if (error.name === 'TokenExpiredError') // if error is token expired
          res.cookie('error', 'Your token has expired, please login again to continue.')
        else // otherwise
          res.cookie('error', 'An error occurred, please login again to continue.')

        return res.clearCookie('jwt').redirect('/auth/login')
      }
    }
    next()
  } 
}