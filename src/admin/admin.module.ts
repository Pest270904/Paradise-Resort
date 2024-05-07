import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { FuncService } from 'src/func/func.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [AdminService, PrismaService, FuncService,JwtService],
  controllers: [AdminController]
})
export class AdminModule {}
