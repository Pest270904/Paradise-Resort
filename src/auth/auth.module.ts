import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FuncService } from 'src/func/func.service';

@Module({
  imports: [
    JwtModule,
],
  controllers: [AuthController],
  providers: [AuthService, FuncService]
})
export class AuthModule {}
