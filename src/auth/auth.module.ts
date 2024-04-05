import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    JwtModule,
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AppService]
})
export class AuthModule {}
