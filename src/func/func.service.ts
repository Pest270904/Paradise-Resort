import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class FuncService {
    constructor(
        private config: ConfigService,
      ) {}

    /**
     * Get token from header of the `Request`, return token if found else return null.
     * 
     * Info: 
     * - `Param`:   Request
     * - `returns`: JWT Token
     */
    getTokenFromHeader_Req(req : Request) {
        if(req.rawHeaders.find(header => header.startsWith('jwt')) != undefined)
          return req.rawHeaders.find(header => header.startsWith('jwt')).split('=')[1];
        return null
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
        if (userToken != null) {
          const decoded = jwt.verify( userToken, this.config.get('JWT_SECRET')) as DecodedToken;
          return { username: decoded.username };
        }
        else
        return { username: null }
    }

    /**
     *  -------------------------------IN DEV-------------------------------
     */
    isExpiredJwt(req: Request) {
        try {
            const decoded = jwt.verify(this.getTokenFromHeader_Req(req), this.config.get('JWT_SECRET')) as DecodedToken
            const expirationTime = decoded.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            if (currentTime >= expirationTime) {
                // Token has expired
                return true;
            } else {
                // Token is still valid
                return false;
            }
        }
        catch {
            return true
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