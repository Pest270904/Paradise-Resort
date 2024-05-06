import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FuncService } from 'src/func/func.service';
import { Gateway } from 'src/gateway/gateway';
import { AdminService } from 'src/admin/admin.service';

@Module({
  controllers: [ChatController],
  providers: [Gateway, ChatService, PrismaService, FuncService, AdminService]
})
export class ChatModule {}
