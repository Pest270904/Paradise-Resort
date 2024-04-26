import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FuncService } from 'src/func/func.service';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, PrismaService, FuncService]
})
export class ChatModule {}
