import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { FuncModule } from './func/func.module';
import { FuncService } from './func/func.service';
import { CheckTokenMiddleware } from './middleware/checkToken.middleware';
import { RoomModule } from './room/room.module';
import { RoomController } from './room/room.controller';
import { AdminModule } from './admin/admin.module';
import { ChatModule } from './chat/chat.module';
import { GatewayModule } from './gateway/gateway.module';
import { PaymentModule } from './payment/payment.module';
import { CheckLoginMiddleware } from './middleware/checkLogin.middleware';
import { AdminController } from './admin/admin.controller';
import { ReservationModule } from './reservation/reservation.module';
import { ReservationController } from './reservation/reservation.controller';
import { AdminService } from './admin/admin.service';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ReviewService } from './review/review.service';
import { ReviewModule } from './review/review.module';
import { ReviewController } from './review/review.controller';
import { PrismaService } from './prisma/prisma.service';
import { PaymentController } from './payment/payment.controller';
@Module({
  imports: [
    GatewayModule,
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    FuncModule,
    RoomModule,
    AdminModule,
    ChatModule,
    PaymentModule,
    ReservationModule,
    UserModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService, 
    AppService, 
    FuncService,
    AdminService,
    AdminService,
    ReviewService,
    PrismaService
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(CheckTokenMiddleware).forRoutes(
          AuthController,
          AppController, 
          RoomController, 
          ReservationController, 
          AdminController,
          UserController,
          ReviewController,
          PaymentController
        )
        .apply(CheckLoginMiddleware).forRoutes(
          ReservationController,
          UserController,
          AdminController
        )
  }
}