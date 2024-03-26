import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [],
})
export class AppModule {}