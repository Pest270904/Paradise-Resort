import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FuncService } from 'src/func/func.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FuncService]
})
export class UserModule {}
