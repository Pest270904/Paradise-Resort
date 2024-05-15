import { Controller, Get, Param, Redirect, Render, Req , Res} from '@nestjs/common';
import { Request, Response } from 'express'
import { RoomService } from './room.service';
import { FuncService } from 'src/func/func.service';

@Controller('room')
export class RoomController {
    constructor(
        private roomService: RoomService,
        private funcService: FuncService
      ) {}

    @Get()
    @Render('room')
    async room(@Req() req: Request) {
      return {
        ...this.funcService.getUsernameFromJwt_Req(req), 
        ...await this.roomService.getAllRoom()
      }
    }

    @Get('create')
    @Redirect('/room')
    async createRoom() {
      await this.roomService.createRoom()
    }

    @Get(':id') 
    @Render('booking')
    async getId(@Param() param: any, @Req() req: Request, @Res() res: Response) {
      return {
        ...this.funcService.getUsernameFromJwt_Req(req),   // for display username on menu-bar
        ...await this.roomService.getRoomById(param.id), 
        ...await this.funcService.getUserFromUsername(req), // get user information for rendering in booking.hbs
        ...await this.funcService.getError(req, res)
      }
    }
}