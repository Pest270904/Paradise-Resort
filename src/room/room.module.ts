import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { FuncService } from 'src/func/func.service';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [FuncService, RoomService]
})
export class RoomModule {}
