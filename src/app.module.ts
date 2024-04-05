import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [JwtService, AppService],
})
export class AppModule {}