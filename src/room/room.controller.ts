import { Controller, Get, Redirect, Render, Req , Res} from '@nestjs/common';
import { Request } from 'express'
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
      return {...this.funcService.getUsernameFromJwt_Req(req), ...await this.roomService.getAllRoom()}
    }

    @Get('create')
    @Redirect('/room')
    async createRoom() {
      await this.roomService.createRoom()
    }
}