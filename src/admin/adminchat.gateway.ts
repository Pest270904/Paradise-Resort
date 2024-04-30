import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Prisma, Message } from '@prisma/client';
import { Request } from 'express';
import { AdminService } from './admin.service';


@WebSocketGateway()
export class AdminchatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly adminService: AdminService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(req: Request, client: Socket, messageData: any): Promise<void> {
    try {
      // Gửi dữ liệu tin nhắn vào phương thức sendMessage của ChatService để xử lý
      const createdMessage = await this.adminService.sendMessage(req, messageData);

      // Gửi tin nhắn đã tạo đến tất cả client
      this.server.emit('recMessage', createdMessage);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
    }
  }

  afterInit(server: any) {
    console.log(server)
  }

  handleConnection(client: Socket) {
    console.log(`Connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`)
  }
}