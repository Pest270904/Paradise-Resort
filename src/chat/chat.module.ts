import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FuncService } from 'src/func/func.service';
import { Gateway } from 'src/gateway/gateway';

@Module({
  controllers: [ChatController],
  providers: [Gateway, ChatService, PrismaService, FuncService]
})
export class ChatModule {}
