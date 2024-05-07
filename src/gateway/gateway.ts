import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io'; 
  import { Request } from 'express';
  import { FuncService } from 'src/func/func.service';
  import { AdminService } from 'src/admin/admin.service';
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class Gateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    constructor(private adminService : AdminService, private readonly funcService: FuncService) {}
    @WebSocketServer() server: Server;
  
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket): Promise<void> {
        try {
            // Join the specified room
            client.join(roomName);
            //console.log(`Client ${client.id} joined room ${roomName}`);
        } catch (error) {
            console.error(error);
        }
    }

    @SubscribeMessage('message')
    async handleSendMessage(@MessageBody() data: { content: string, roomName: string, username: string}): Promise<void> {
        try {
            //console.log(data.username);          
            this.server.to(data.roomName).emit('recmessage', { content: data.content, username: data.username });
        } catch (error) {
            console.error(error);
        }
    }

    @SubscribeMessage('loadlist')
    async loadChatList(@MessageBody() data: any){
        try {
          const chatList = await this.adminService.getChatList();
          this.server.emit('receichatlist', chatList);
        } catch (error) {
            console.error(error);
        }
    }

    afterInit(server: any) {
      //console.log(server) 
    }
    handleConnection(client: Socket) {
      //console.log(`Connected: ${client.id}`)
    }
  
    handleDisconnect(client: Socket) {
      //console.log(`Disconnected: ${client.id}`) 
    }
  }