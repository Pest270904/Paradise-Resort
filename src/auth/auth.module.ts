import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FuncService } from 'src/func/func.service';

@Module({
  imports: [
    JwtModule,
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, FuncService]
})
export class AuthModule {}
