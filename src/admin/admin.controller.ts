import { Controller, Get, Req, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { FuncService } from 'src/func/func.service';
import { Response, Request } from 'express'

@Controller('admin')
export class AdminController {
    constructor (
        private adminService : AdminService,
        private funcService : FuncService
    ) {}

    @Get()
    admin(@Req() req: Request, @Res() res: Response) {
    res.render('admin', {
      layout: 'admin-layout'
    })
    return this.funcService.getUsernameFromJwt_Req(req)
  }

    @Get('create')
    async createAdmin() {
        // console.log('aa')
      return await this.adminService.createAdmin(); 
    }
}
