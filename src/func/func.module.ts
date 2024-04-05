import { Module } from '@nestjs/common';
import { FuncService } from './func.service';

@Module({
  providers: [FuncService]
})
export class FuncModule {}
