import { Module } from '@nestjs/common';
import { AdminchatController } from './adminchat.controller';
import { AdminchatService } from './adminchat.service';
import { AdminchatGateway } from './adminchat.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { FuncService } from 'src/func/func.service';

@Module({
  controllers: [AdminchatController],
  providers: [AdminchatService, AdminchatGateway, PrismaService, FuncService]
})
export class AdminchatModule {}
