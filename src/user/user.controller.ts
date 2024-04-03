import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getMe(@Req() req: Request, @Res() res: Response) {

        res.render(`home`)
        return req.user
    }
}
