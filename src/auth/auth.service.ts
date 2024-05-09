import { BadRequestException, ForbiddenException, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginUserDto } from './dto/user_login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private prisma : PrismaService, 
        private jwt : JwtService, 
        private config : ConfigService,
    ) {}

    // --------------------------------- Main functions ---------------------------------
    getSignup(req : Request, res : Response) {
        const error = req.cookies.error
        res.clearCookie('error').render('signup', {
            layout: 'login-layout',
            error: error
        })
    }

    getLogin(req : Request, res : Response) {
        const error = req.cookies.error
        res.clearCookie('error').render('login', {
            layout: 'login-layout',
            error: error
        })
    }

    async signUp(userData : CreateUserDto, res : Response) {
        try {
            if(userData.username === "" || userData.fullName === "" || userData.email === "" || userData.password === "" || userData.password_confirmation === "")
                throw new ForbiddenException("Look like you are missing something")

            if(!userData.username.match(/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/))
                throw new ForbiddenException("Username must has at least 6 letters, can only contain lowercase letters and numbers")

            if(!userData.password.match(/^(?=.*[A-Z])[a-zA-Z0-9]{8,}$/))
                throw new BadRequestException('Your password should only contain alphanumeric character, at least 6 chars, at least 1 uppercase')

            if(userData.password !== userData.password_confirmation) 
                throw new ForbiddenException("Your confirm password is not correct")

            // generate hashed password
            const hash = await argon.hash(userData.password)
            // save the user to db  
            const user = await this.prisma.user.create({
                data: {
                    username: userData.username,
                    fullName: userData.fullName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    hash
                },
            })
            
            // return access token if signup completed
            res.cookie('jwt', await this.signToken(user.username, user.email)).redirect(`/`)
        } // if signup failed
        catch (err) {
            if(err instanceof PrismaClientKnownRequestError && err.code === 'P2002')
                err.message = 'Credentials incorrect'

            res.cookie('error', err.message).redirect(`/auth/signup`)
        }
    }

    async signIn(userData: LoginUserDto, res: Response) {
        try {
            if (userData.username === "" || userData.password === "")
                throw new ForbiddenException("Looks like you are missing something")
    
            // find the user by username
            const user = await this.prisma.user.findUnique({
                where: {
                    username: userData.username
                }
            })
    
            // throw exception if no username exists
            if (!user) throw new ForbiddenException('Credentials incorrect')
    
            // compare password
            const pwMatches = await argon.verify(user.hash, userData.password)
    
            // if password incorrect throw exception
            if (!pwMatches) throw new ForbiddenException('Credentials incorrect')
    
            // Determine the redirection path based on isAdmin
            const redirectionPath = user.isAdmin ? '/admin' : '/';
    
            // return access token if signin completed
            res.cookie('jwt', await this.signToken(user.username, user.email)).redirect(redirectionPath);
        } catch (err) {
            res.cookie('error', err.message).redirect(`/auth/login`)
        }
    }
    

    logOut(res : Response) {
        res.clearCookie('jwt').redirect('/')
    }

    // --------------------------------- Other functions ---------------------------------
    async signToken(username: string, email: string){
        const payload = {
            username: username,
            email: email,
            role: 'user'
        };
        const user = await this.prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                isAdmin: true
            }
        });
        if (user && user.isAdmin) {
            payload.role = 'admin';
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
              expiresIn: '15m',
              secret: secret,
            },
          )

        return  token;
    }
}