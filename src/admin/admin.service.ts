import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2'
import { Message, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { FuncService } from 'src/func/func.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService, private readonly funcService: FuncService) {}

  async createAdmin()  {
      const hashedPassword = await hash('112233');
      await this.prisma.user.create({
          data:
              {
                  username: 'admin',
                  fullName: 'Admin User',
                  email: 'admin@example.com',
                  phoneNumber: '0000000000',
                  hash: hashedPassword,
                  isAdmin: true
          } })
  }
  async createMessage(req: Request, senderId: number, receiverUsername: string, content: string, username_receiver: string): Promise<Message> {
    try {
      const { username } = await this.funcService.getUsernameFromJwt_Req(req);      
      if (!username) {
        throw new BadRequestException('Please log in before chatting');
      }
      const sender = await this.prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });
      const receiver = await this.prisma.user.findUnique({
        where: {
          username: username_receiver,
        },
        select: {
          id: true,
        },
      });
      if (!receiver) {
        throw new BadRequestException(`Recipient ${receiverUsername} not found.`);
      }
      const createdDate = new Date(); // Tạo đối tượng Date với múi giờ mặc định (UTC)
      const localDate = new Date(createdDate.getTime() + (7 * 60 * 60 * 1000)); // Chuyển đổi sang GMT+7
      return await this.prisma.message.create({
        data: {
          sender_id: sender.id, // Liên kết với người gửi
          receiver_id: receiver.id, // Liên kết với người nhận
          content: content,
          timestamp: localDate,
        },
      });
    } catch (error) {
      throw new Error(`Error sending message: ${error.message}`);
    }
  }

  async sendMessage(req: Request, messageData: any, username: string): Promise<Message> {
    try {
      const { userId, receiverId, content } = messageData; // Trích xuất userId, tên người nhận và content từ dữ liệu tin nhắn
      const createdMessage = await this.createMessage(req, userId, receiverId, content, username); // Gọi phương thức createMessage với userId, tên người nhận và content
      return createdMessage; // Trả về tin nhắn đã được tạo thành công
    } catch (error) {
      throw new Error(`Error sending message: ${error.message}`);
    }
  }
  
  async getChatList(): Promise<{ user: User; latestMessage: Message }[]> {
    const userId = 1; // ID của người dùng mà bạn muốn tìm kiếm tin nhắn gần nhất

    try {
      // Lấy danh sách tin nhắn gần nhất của người dùng có userID là 1 và các người dùng khác
      const chatList = await this.prisma.message.findMany({
        where: {
          OR: [
            { sender_id: userId },
            { receiver_id: userId },
          ],
        },
        orderBy: {
          timestamp: 'desc',
        },
        include: {
          sender: true,
          receiver: true,
        },
      });

      // Tạo một đối tượng map để lưu tin nhắn gần nhất cho mỗi người dùng
      const latestMessagesMap = new Map<number, Message>();

      // Lọc và chỉ giữ lại tin nhắn gần nhất cho mỗi người dùng
      chatList.forEach(message => {
        const partnerId = message.sender_id === userId ? message.receiver_id : message.sender_id;
        if (!latestMessagesMap.has(partnerId)) {
          latestMessagesMap.set(partnerId, message);
        }
      }); 

      // Chuyển đổi map thành mảng kết quả
      const userList: { user: User; latestMessage: Message }[] = [];
      for (const [partnerId, latestMessage] of latestMessagesMap.entries()) {
        const user_id = latestMessage.sender_id === userId ? latestMessage.receiver_id : latestMessage.sender_id;
        const user = await this.prisma.user.findUnique({
          where: {
            id: user_id,
          },
        });
        userList.push({ user, latestMessage });
      }
      return userList;
    } catch (error) {
      throw new Error(`Failed to fetch chat list: ${error.message}`);
    }
  }

  async getChatHistoryByUsername(username: string): Promise<Message[]> {
    try {
      // Tìm người dùng dựa trên username
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Lấy lịch sử chat của người dùng với sender_id hoặc receiver_id là user.id
      const chatHistory = await this.prisma.message.findMany({
        where: {
          OR: [
            { sender_id: user.id },
            { receiver_id: user.id },
          ],
        },
      });
      return chatHistory;
    } catch (error) {
      throw new Error(`Failed to get chat history by username: ${error.message}`);
    }
  }
}
