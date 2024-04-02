import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginUserDto } from './dto/user_login.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(private prisma : PrismaService) {
        
    }

    async signUp(userData : CreateUserDto, res: Response) {
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

            // remove hash of returned password
            delete user.hash

            res.redirect(`${userData.username}`); // Redirect to /user/{username}
            return user;
        }
        catch(error) {
            if(error instanceof PrismaClientKnownRequestError)
                if(error.code === 'P2002')
                    throw new ForbiddenException('Credentials taken')
            throw error
        }
    }

    async signIn(userData : LoginUserDto, res: Response) {
        // find the user by username
        const user = await this.prisma.user.findFirst({
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

        // send back user
        delete user.hash

        res.redirect(`${userData.username}`);  // Redirect to /user/{username}
        return user
    }
}
