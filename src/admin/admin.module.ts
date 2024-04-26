import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { FuncService } from 'src/func/func.service';

@Module({
  providers: [AdminService, FuncService],
  controllers: [AdminController]
})
export class AdminModule {}
