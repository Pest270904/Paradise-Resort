import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginUserDto } from './dto/user_login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma : PrismaService, 
        private jwt : JwtService, 
        private config : ConfigService,
    ) {}

    async signUp(userData : CreateUserDto) {
        try {
            // generate hashed password
            const hash = await argon.hash(userData.password)
            // save the user to db
            const user = await this.prisma.user.create({
                data: {
                    username: userData.username,
                    fullName: userData.fullName,
                    email: userData.email,
                    hash
                },
            })
            
            // return access token if signup completed
            return this.signToken(user.username, user.email)
        }
        catch(error) {
            if(error instanceof PrismaClientKnownRequestError)
                if(error.code === 'P2002')
                    throw new ForbiddenException('Credentials taken')
            throw error
        }
    }

    async signIn(userData : LoginUserDto) {
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

        // return access token if signin completed
        return this.signToken(user.username, user.email)
    }

    async signToken(username: string, email: string){
        const payload = {
            username: username,
            email
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
              expiresIn: '15m',
              secret: secret,
            },
          );

        return  token
    }
}
