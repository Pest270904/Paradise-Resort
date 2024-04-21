import { Controller, Get, Render, Req , Res} from '@nestjs/common';
import { Request, Response} from 'express'
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
      const room = await this.roomService.getAllRoom()
      return {...this.funcService.getUsernameFromJwt_Req(req), ...room}
    }

    @Get('create')
    async createRoom(@Res() res : Response) {
      await this.roomService.createRoom()
      res.redirect('/room')
    }
}
