import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { FuncService } from 'src/func/func.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AdminService, PrismaService, FuncService],
  controllers: [AdminController]
})
export class AdminModule {}
