import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CheckLoginMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.jwt
        
        // If not login then return to login page
        if( token === undefined ) {
            res.cookie('error', 'Please login to use this feature').redirect(`/auth/login`)
            throw new UnauthorizedException('Please login to use this feature')
        }     
        
        next()
    }
}