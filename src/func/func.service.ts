import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FuncService {
    constructor(
        private config: ConfigService,
        private prisma : PrismaService,
      ) {}

    /**
     * Get token from header of the `Request`, return token if found else return null.
     * 
     * Info: 
     * - `Param`:   Request
     * - `returns`: JWT Token
     */
    getTokenFromHeader_Req(req : Request) {
        return req.cookies.jwt;
      }
    
    /**
     * Get token from header of the `Response`.
     * 
     * Info: 
     * - `Param`:   Response
     * - `returns`: JWT Token
     */
    getTokenFromHeader_Res(res : Response) {
      return res.getHeaders()['set-cookie'].toString().split('=')[1].split(';')[0];
    }

    /**
     * Get username from JWT token of the `Request`, return username if found else return null.
     * 
     * Info: 
     * - `Param`:   Request
     * - `returns`: object {username}
     */
    getUsernameFromJwt_Req(req : Request) {
      const userToken = this.getTokenFromHeader_Req(req);
      if (userToken != undefined) {
        const decoded = jwt.verify( userToken, this.config.get('JWT_SECRET')) as DecodedToken;
        return { username: decoded.username };
      } else
          return { username: null }
    }

    async getUserFromUsername(req : Request) {
      const username_token = await this.getUsernameFromJwt_Req(req).username
      if(username_token !== null) {
        const user = await this.prisma.user.findFirst({
          where: {
            username : username_token
          }
        })
        return {user : user}
      }
    }
    
}
    
interface DecodedToken {
    username: string
    email: string
    iat: number
    exp: number
    // other properties if present in your token payload
}