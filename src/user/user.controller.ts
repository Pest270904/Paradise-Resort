import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FuncService } from 'src/func/func.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly funcService: FuncService,
        private readonly userService: UserService
    ) {}
    
    @Get(':id')
    @Render('profile')
    async getProfile(@Param() param: any, @Req() req: Request, @Res() res: Response){
        return {...this.funcService.getUsernameFromJwt_Req(req),
            ...await this.userService.getUserInfo(param.id),
            ...await this.funcService.getError(req, res)
        }
    } 

    @Post(':id/changeInformation')
    async changeInformation(@Body() data: any, @Res() res: Response) {
        await this.userService.changeIn4(data, res)
    }

    @Post(':id/changePassword')
    async changePassword(@Body() data: any, @Res() res: Response) {
        await this.userService.changePassword(data, res)
    }
}
