import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import {Request, Response} from 'express'

@Controller('user')
export class UserController {
    @Get()
    root(@Res() res: Response) {
        return res.render('home', { 
            message: 'Hello world!!' 
        });
    }

    @Get('login')
    userLogin(@Res() res: Response) {
        return res.render('login', { 
            layout: '',   // No layouts
            message: 'Hello world!!' 
        });
    }

    @Post('login')
    createUser(@Req() request: Request, @Res() response: Response){
        console.log(request.body)
        response.send({
            message: 'Account created',
            infomation: request.body
        })
    }
}
